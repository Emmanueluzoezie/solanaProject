import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';  // Update this import based on your project setup
import { useQuery } from '@apollo/client';
import { GET_ALL_USER } from '../graphql/queries';
import { selectUserInfo, selectUserRank, setUserRank } from '../slice/userSlice';
import { FaCaretDown } from 'react-icons/fa';

const LeaderBoardRank = () => {
    const [userDetails, setUserDetails] = useState(null);
    const appTheme = useSelector(selectAppTheme);
    const userRank = useSelector(selectUserRank); // Update this line based on your project setup
    const dispatch = useDispatch();
    const getUserInfo = useSelector(selectUserInfo);

    const { data, loading, error } = useQuery(GET_ALL_USER); // Update this line based on your project setup

    const userInfo = data?.getUserList;

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const TopFiveLeader = userInfo?.sort((a:any, b:any) => b.coins - a.coins).slice(0, 5);

    useEffect(() => {
        if (data) {
            const sortedUsers = userInfo?.sort((a:any, b:any) => b.coins - a.coins);
            const currentUserIndex = sortedUsers?.findIndex((user:any) => user.full_name === getUserInfo.name);

            if (currentUserIndex !== -1) {
                const currentUser = sortedUsers[currentUserIndex];
                setUserDetails(currentUser);
                dispatch(setUserRank(currentUserIndex + 1));
            }
        }
    }, []);

    return (
        <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1rem', color, fontFamily: 'Lato-Bold' }}>
                    Top 5 LeaderBoard
                </p>
                <button>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <p style={{ padding: '0.25rem 0.5rem', fontWeight: 'bold', color, fontFamily: 'Lato-Bold' }}>
                            See all
                        </p>
                    
                    </div>
                </button>
            </div>
            {loading ? (
                <div style={{ width: '100%', height: '70px', borderRadius: '4px', backgroundColor: containerColor }} />
            ) : error ? (
                <div className=''>
                    <p style={{ fontSize: '1rem', color, fontFamily: 'Lato-Bold' }}>
                        Oops! An error occurred on our end. Check your internet connection and try again.
                    </p>
                    <div className='flex justify-center'>
                        <button className='p-1 px-4 rounded-md mt-3' style={{ backgroundColor: primary }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1rem', color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }}>
                                Click to reload
                            </p>
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{ padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem', backgroundColor: appColor.primaryDarkColor }}>
                        <p style={{ paddingLeft: '1rem', fontWeight: 'bold', fontFamily: 'Lato-Bold' }}>
                            Your rank
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.25rem' }}>
                            <p style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>{userRank}</p>
                            <img src={userDetails?.image} style={{ width: '2.5rem', height: '2.5rem', margin: '0.5rem 0.75rem', borderRadius: '50%' }} />
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 'bold', paddingBottom: '0.125rem', fontSize: '1rem', color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>
                                    {userDetails?.full_name}
                                </p>
                                <p style={{ fontSize: '0.8125rem', color: "black", fontFamily: 'Lato-Regular' }}>
                                    Over all Quiz
                                </p>
                            </div>
                            <button style={{ width: '1.125rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '0.125rem', height: '1.125rem', backgroundColor: 'white' }}>
                                <AntDesign name="caretdown" size={12} color={primary} />
                            </button>
                        </div>
                    </div>

                    {TopFiveLeader.map((item:any, index:any) => {
                        if (item.name === userDetails?.name) {
                            return null;
                        }
                        return (
                            <div style={{ padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem', backgroundColor: containerColor }} key={item.id}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.25rem' }}>
                                    <p style={{ color, fontFamily: 'Lato-Bold' }}>{index + 1}</p>
                                    <img src={item.image} style={{ width: '2.5rem', height: '2.5rem', margin: '0.75rem', borderRadius: '50%' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 'bold', paddingBottom: '0.125rem', fontSize: '1rem', color, fontFamily: 'Lato-Bold' }}>
                                            {item.full_name}
                                        </p>
                                    </div>
                                    <button style={{ width: '1.125rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '0.125rem', height: '1.125rem', backgroundColor: 'white' }}>
                                        <FaCaretDown className=''/>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LeaderBoardRank;