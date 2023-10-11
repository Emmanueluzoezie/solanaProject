import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from './AppColor';
import { LOGIN_PROVIDER, OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../solanaRPC";
import { WALLET_ADAPTERS } from '@web3auth/base';
import { selectKey, selectProvider, selectWeb3Auth, setAddress, setBalance, setKey, setProvider, setSignedMessage, setTokenId, setTransaction, setUserInfo } from '../slice/userSlice';
import { selectAppTheme, selectErrorMessage, setErrorMessage, setIsUserLogin } from '../slice/AppSlices';
import { GET_ALL_USER } from '../graphql/queries';
import Image from 'next/image';
// import "../assets/google.png"

const scheme = 'solana-hack:';
const resolvedRedirectUrl = `${scheme}://web3auth`

const SignUpComponent = () => {
    const provider = useSelector(selectProvider)
    const errorMessage = useSelector(selectErrorMessage);
    const appTheme = useSelector(selectAppTheme);
    const web3auth = useSelector(selectWeb3Auth);
    const dispatch = useDispatch();
    const { data, loading, error } = useQuery(GET_ALL_USER);
    const getKey = useSelector(selectKey)


    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;
    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;
    const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor;

    const login = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        try {
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                mfaLevel: "none", // Pass on the mfa level of your choice: default, optional, mandatory, none
                loginProvider: "google", // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
            });
            console.log(web3authProvider);
            dispatch(setProvider(web3authProvider))
            dispatch(setIsUserLogin(true))
        } catch (error) {
            console.error("Login failed with OpenLogin", error);
        }
    };

    const authenticateUser = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const idToken = await web3auth.authenticateUser();
        console.log("idToken: ", idToken);
        dispatch(setTokenId(idToken));
    };

    const getUserInfo = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const user = await web3auth.getUserInfo();
        dispatch(setUserInfo(user))
        console.log("user: ", user);
    };

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        dispatch(setKey(null))
    };

    const getAccounts = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const address = await rpc.getAccounts();
        dispatch(setAddress(address))
        console.log("address: ", address);
    };

    const getBalance = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const balance = await rpc.getBalance();
        dispatch(setBalance(balance))
        console.log("balance: ", balance);
    };

    const sendTransaction = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const receipt = await rpc.sendTransaction();
        dispatch(setTransaction(receipt))
        console.log("receipt: ", receipt);
    };

    const signMessage = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const signedMessage = await rpc.signMessage();
        dispatch(setSignedMessage(signedMessage))
        console.log("signedMessage: ", signedMessage);
    };

    const getPrivateKey = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const privateKey = await rpc.getPrivateKey();
        dispatch(setKey(privateKey))
        console.log("privateKey:  ", privateKey);
    };

    // useEffect(() => {
    //     if (provider) {
    //         authenticateUser()
    //         getUserInfo()
    //         getAccounts()
    //         getBalance()
    //         sendTransaction()
    //         signMessage()
    //         getPrivateKey()
    //     }
    // }, [])

    return (
        <div style={{ backgroundColor: bgColor }} className="p-4 h-full">
            <div className=''>
                <div className=''>
                    <div style={{ zIndex: 1, flex: 1, paddingBottom: 10 }}>
                        <div className='items-center mt-20'>
                            <Image src={require("../assets/google.png")} className='w-[100px] h-[100px]' alt="Logo" width={30} height={30} />
                        </div>
                        {errorMessage &&
                            <div className='absolute top-[190px] w-full px-4'>
                                <div style={{ backgroundColor: appColor.errorColor }} className='px-4 py-2 rounded-md'>
                                    <p style={{ color: "white" }} className='font-bold'>{errorMessage}</p>
                                </div>
                            </div>
                        }
                        <div className='flex'>
                            <button style={{ color, background: containerColor }} className="p-2" onClick={login}>Login with Google</button>
                            <button style={{ color, background: containerColor }} className="p-2" onClick={getAccounts}>Login with Google</button>
                            {/* <div className='px-4 mt-[-50px]'>
                                <div className='py-3'>
                                    <div 
                                    // onClick={() => login(LOGIN_PROVIDER.GOOGLE)}
                                    >
                                        <div style={{ backgroundColor: containerColor }} className='flex-row justify-center items-center p-3 rounded-md'>
                                            <p style={{ color: textColor, letterSpacing: 0.6 }} className='font-semibold pr-2'>Sign up with</p>
                                            <img src="../assets/google.png" className='w-4 h-4' alt="Google Logo" />
                                            <p style={{ color: textColor, letterSpacing: 0.6 }} className='font-semibold pl-[2px]'>oogle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <div 
                                    // onClick={() => login(LOGIN_PROVIDER.FACEBOOK)}
                                    >
                                        <div style={{ backgroundColor: containerColor }} className='flex-row justify-center items-center p-3 rounded-md'>
                                            <p style={{ color: textColor, letterSpacing: 0.6 }} className='font-semibold pr-1'>Sign up with</p>
                                            <img src="../assets/facebook.png" className='w-[10px] h-[16px]' alt="Facebook Logo" />
                                            <p style={{ color: textColor, letterSpacing: 0.6 }} className='font-semibold pl-[1px]'>acebook</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <div 
                                    // onClick={() => login(LOGIN_PROVIDER.TWITTER)}
                                    >
                                        <div style={{ backgroundColor: containerColor }} className='flex-row justify-center items-center p-3 rounded-md'>
                                            <p style={{ color: textColor, letterSpacing: 0.6 }} className='font-semibold pr-1'>Sign up with</p>
                                            {appTheme === "dark" ? (
                                                <img src="../assets/xcom.png" className='w-3 h-3' alt="Xcom Logo" />
                                            ) : (
                                                <img src="../assets/lightx.png" className='w-3 h-3' alt="LightX Logo" />
                                            )}
                                            <p style={{ color: textColor, letterSpacing: 0.6 }} className='font-semibold'>Twitter</p>
                                        </div>
                                    </div>
                                </div> */}
                            {/* <SignupWIthEmail /> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        position: "relative",
    },
};

export default SignUpComponent

