import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppUserState {
    key: any;
    userInfo: any;
    idToken: any
    address:any
    userAccount:any
    balance:any
    transaction:any
    signedMessage: any
    console: any;
    web3auth: any;
    userId: string;
    userPoints: number;
    userRank: number
    provider: any
}

const initialState: AppUserState = {
    key: "",
    userInfo: "",
    console: "",
    web3auth: null,
    userId: "",
    userPoints: 0,
    userRank: 0,
    idToken: "",
    address: "",
    userAccount: "",
    balance: "",
    transaction: null,
    signedMessage: "",
    provider:  null
}

export const userSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setKey: (state, action: PayloadAction<any>) => {
            state.key = action.payload;
        },
        setUserAccount: (state, action: PayloadAction<any>) => {
            state.userAccount = action.payload;
        },
        setTokenId: (state, action: PayloadAction<any>) => {
            state.idToken = action.payload;
        },
        setAddress: (state, action: PayloadAction<any>) => {
            state.address = action.payload;
        },
        setTransaction: (state, action: PayloadAction<any>) => {
            state.transaction = action.payload;
        },
        setBalance: (state, action: PayloadAction<any>) => {
            state.balance = action.payload;
        },
        setSignedMessage: (state, action: PayloadAction<any>) => {
            state.signedMessage = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        setConsole: (state, action: PayloadAction<any>) => {
            state.console = action.payload;
        },
        setWeb3Auth: (state, action: PayloadAction<any>) => {
            state.web3auth = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setUserPoints: (state, action: PayloadAction<number>) => {
            state.userPoints = action.payload;
        },
        setUserRank: (state, action: PayloadAction<number>) => {
            state.userRank = action.payload;
        },
        setProvider: (state, action: PayloadAction<any>) => {
            state.provider = action.payload;
        },
    }
});

export const { setKey, setUserInfo, setConsole, setWeb3Auth, setUserId, setUserRank, setAddress, setSignedMessage, setTokenId, setBalance, setUserAccount, setTransaction, setUserPoints, setProvider } = userSlice.actions;

export const selectKey = (state: RootState) => state.user.key
export const selectUserInfo = (state: RootState) => state.user.userInfo
export const selectConsole = (state: RootState) => state.user.console;
export const selectAccount= (state: RootState) => state.user.userAccount;
export const selectTokenId = (state: RootState) => state.user.idToken;
export const selectBalance = (state: RootState) => state.user.balance;
export const selectTransaction = (state: RootState) => state.user.transaction;
export const selectSignedMessage = (state: RootState) => state.user.signedMessage;
export const selectAddress = (state: RootState) => state.user.address;
export const selectWeb3Auth = (state: RootState) => state.user.web3auth;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserPoints = (state: RootState) => state.user.userPoints;
export const selectUserRank = (state: RootState) => state.user.userRank;
export const selectProvider = (state: RootState) => state.user.provider;

export default userSlice.reducer;



