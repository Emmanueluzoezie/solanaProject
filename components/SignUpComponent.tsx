import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from './AppColor';
import { LOGIN_PROVIDER, OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../solanaRPC";
import { WALLET_ADAPTERS } from '@web3auth/base';
import { selectKey, selectProvider, selectWeb3Auth, setAddress, setBalance, setKey, setProvider, setSignedMessage, setTokenId, setTransaction, setUserInfo } from '../slice/userSlice';
import { selectAppTheme, selectErrorMessage, selectNewUser, setErrorMessage, setIsUserLogin } from '../slice/AppSlices';
import { GET_ALL_USER } from '../graphql/queries';
import Image from 'next/image';
import SignupWithEmail from './SignupWithEmail';
import LandingCompoent from './landingCompoent';
// import "../assets/google.png"

const scheme = 'solana-hack:';
const resolvedRedirectUrl = `${scheme}://web3auth`

const SignUpComponent = () => {
    const provider = useSelector(selectProvider)
    const errorMessage = useSelector(selectErrorMessage);
    const appTheme = useSelector(selectAppTheme);
    const web3auth = useSelector(selectWeb3Auth);
    const isUserNew = useSelector(selectNewUser)
    const dispatch = useDispatch();
    const { data, loading, error } = useQuery(GET_ALL_USER);
    const getKey = useSelector(selectKey)


    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;
    const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor;
    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const login = async (provider:string) => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        try {
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                mfaLevel: "none", // Pass on the mfa level of your choice: default, optional, mandatory, none
                loginProvider: provider, // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
            });
            dispatch(setProvider(web3authProvider))
            dispatch(setIsUserLogin(true))
        } catch (error) {
            console.error("Login failed with OpenLogin", error);
        }
    };

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        dispatch(setKey(null))
    };

    return (
        <div className='md:py-14 h-full rounded'>
            {isUserNew?
                <LandingCompoent />
                :
            <div style={{ backgroundColor: bgColor }} className="p-4  px-8 h-full md:rounded-2xl shadow-xl">
                <div className=''>
                    <div className=''>
                        <div style={{ zIndex: 1, flex: 1, paddingBottom: 10 }}>
                            <div className='flex justify-center items-center mt-6'>
                                    <Image src={require("../assets/finsmatlogo.png")} className='w-[80px] h-[80px]' alt="Logo" width={30} height={30} />
                            </div>
                            {errorMessage &&
                                <div className='absolute top-[190px] w-full px-4'>
                                    <div style={{ backgroundColor: appColor.errorColor }} className='px-4 py-2 rounded-md'>
                                        <p style={{ color: "white" }} className='font-bold'>{errorMessage}</p>
                                    </div>
                                </div>
                            }
                            <div className='mt-10'>
                                <button style={{ color: textColor, background: containerColor }} className="p-3 w-full my-2 font-bold text-xl rounded-lg" onClick={() => login("google")}>Login with Google</button>
                                <button style={{ color: textColor, background: containerColor }} className="p-3 w-full my-2 font-bold text-xl rounded-lg" onClick={() => login("facebook")}>Login with Facebook</button>
                                <button style={{ color: textColor, background: containerColor }} className="p-3 w-full my-2 font-bold text-xl rounded-lg" onClick={() => login("twitter")}>Login with Twitter</button>
                                <button style={{ color: textColor, background: containerColor }} className="p-3 w-full my-2 font-bold text-xl rounded-lg" onClick={() => login("apple")}>Login with Apple</button>

                                <SignupWithEmail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
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

