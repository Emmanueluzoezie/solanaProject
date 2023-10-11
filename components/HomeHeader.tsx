
import { useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER, ADD_USER_HISTORY } from '../graphql/mutations';
import { GET_ALL_USER, GET_USER_BY_EMAIL } from '../graphql/queries';
import { selectAppTheme } from '../slice/AppSlices';
import { selectUserInfo, setUserId, setUserInfo } from '../slice/userSlice';
import { appColor } from './AppColor';

const HomeHeader = () => {
    const [solanaAddress, setSolanaAddress] = useState("")
    const [historyAdded, setHistoryAdded] = useState(false);
    const [copyMessage, setCopyMessage] = useState("")
    const appTheme = useSelector(selectAppTheme)
    const getUserInfo = useSelector(selectUserInfo)
    const dispatch = useDispatch()

    const [addUserToDatabase] = useMutation(ADD_USER, {
        refetchQueries: [GET_ALL_USER, "getUserList"]
    })
    const [addHistoryToDatabase] = useMutation(ADD_USER_HISTORY)

    const { data, loading, error } = useQuery(GET_ALL_USER)
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: "emmanueluzoeziejobs@gmail.com"
        }
    })

    if (loading || userLoading) {
        console.log("loading...")
    }

    if (userError) {
        // console.log("errors:", error)   
        console.log("errors:", userError)
    }

    console.log(data)

    const userInfo = userData?.getUserByEmail[0]

    const AddNewUser = async () => {

        // try {
        //     if (!getUserInfo || solanaAddress === null || secretKey === null) return

        //     if (data) {
        //         const alreadyExist = data.getUserList && data.getUserList.some((user) => user.email === getUserInfo.email);

        //         if (alreadyExist) {
        //             return;
        //         } else {
        //             addUserToDatabase({
        //                 variables: {
        //                     email: getUserInfo.email,
        //                     user_sol_address: solanaAddress,
        //                     user_secret: secretKey,
        //                     badge: "Novice",
        //                     full_name: getUserInfo.name,
        //                     image: getUserInfo.profileImage,
        //                     created_at: new Date(),
        //                     coins: 20,
        //                     token: 0,
        //                     isAdminUser: false
        //                 },
        //             })
        //         }
        //     }
        // } catch (error) {
        // }
    };

    const markHistoryAddedFlag = () => {
        localStorage.setItem('historyAdded', 'true');
    };

    const AddHistory = async () => {
        try {
            if (!historyAdded && userInfo) {
                const result = await addHistoryToDatabase({
                    variables: {
                        title: "Daily treat point",
                        user_id: userInfo?.id,
                        amount: userInfo?.coins,
                        created_at: new Date(),
                        descriptions: `You have been rewarded ${userInfo?.coins} for telling us your daily treat.`
                    },
                });
                if (result.data) {
                    markHistoryAddedFlag();
                }
            }
        } catch (err) {
        }
    };

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
    const container = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor


    const checkHistoryAddedFlag = () => {
        const historyFlag = localStorage.getItem('historyAdded');
        if (historyFlag !== 'true') {
            AddHistory();
        }
    };

    useEffect(() => {
        AddNewUser();
        checkHistoryAddedFlag()
    }, [])

    useEffect(() => {
        if (userData) {
            dispatch(setUserId(userInfo?.id));
            dispatch(setUserInfo(userInfo))
        }
    }, [userData])

    const copyToClipboard = async () => {
        // await Clipboard.setStringAsync(userInfo.user_sol_address);
        setCopyMessage("copied")
        setTimeout(() => {
            setCopyMessage("")
        }, 2000)
    };

    
  return (
    <div className=''>
        {loading || userLoading ?
            <div className='px-2 flex items-center'>
                  <div className='w-[32px] h-[32px] rounded-full' style={{ backgroundColor: container }}/>
                  <div className='pl-4 flex-1'>
                      <div className='w-full h-[14px] mb-2' style={{ backgroundColor: container }} />
                      <div className="w-full h-[14px]" style={{ backgroundColor: container }} />
                </div>
            </div>
            :
              <div >
                  <div className="flex items-center justify-between"  >
                      <div style={{display:"flex"}}>
                          <div className={`rounded-full w-[50px] h-[50px] `}>
                              <Image src={userInfo?.image} className="rounded-full" width={30} height={30} alt="User" />
                          </div>
                          <div className="pl-2">
                              <p className="text-14 font-bold" style={{ color: 'yourColor', fontFamily: 'Lato-Bold' }}>
                                  {userInfo?.full_name}
                              </p>
                              <div className="flex-row w-105">
                                  <p className="text-12" style={{ color: 'yourTextColor', fontFamily: 'Lato-Regular' }}>
                                      {userInfo?.user_sol_address}
                                  </p>
                                  <button onClick={copyToClipboard} className="pl-4">
                                      Copy
                                  </button>
                              </div>
                          </div>
                      </div>
                      <div className="flex  justify-between w-[100px] border-black">
                          <div className="items-center">
                              <Image src={require("../assets/investor.png")} alt="Investor" className="w-[18px] h-[18px]" />
                              <p className="pl-1 text-12 font-bold capitalize" style={{ color: 'yourColor', fontFamily: 'Lato-Bold' }}>
                                  {userInfo?.badge}
                              </p>
                          </div>
                          <div className="items-center pl-2">
                              <Image src={require("../assets/coins.png")} alt="Investor" className="w-[18px] h-[18px]" />
                              <p className="pl-1 text-12 font-bold" style={{ color: 'yourColor', fontFamily: 'Lato-Bold' }}>
                                  {userInfo?.coins}
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="font-semibold absolute w-full bottom-[-4]">
                      <p className="font-semibold text-center text-12" style={{ color: 'yourColor' }}>{copyMessage}</p>
                  </div>
              </div>
        }
    </div>
  )
}

export default HomeHeader