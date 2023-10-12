import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppScreenState {
    calculatorCurrentScreen: string
    currentToolScreen: string
    currentSettingScreen: string
}

const initialState: AppScreenState = {
    calculatorCurrentScreen: "investment",
    currentToolScreen: "home_view",
    currentSettingScreen: "home_settings"
}

export const screenSlice = createSlice({
    name: "screen",
    initialState,
    reducers: {
        setCalculatorCurrentScreen: (state, action: PayloadAction<string>) => {
            state.calculatorCurrentScreen = action.payload;
        },
        setCurrentToolScreen: (state, action: PayloadAction<string>) => {
            state.currentToolScreen = action.payload;
        },
        setCurrentSettingScreen: (state, action: PayloadAction<string>) => {
            state.currentSettingScreen = action.payload;
        },
    }
});

export const { setCalculatorCurrentScreen, setCurrentToolScreen, setCurrentSettingScreen } = screenSlice.actions;

export const selectCalculatorCurrentScreen = (state: RootState) => state.screen.calculatorCurrentScreen
export const selectCurrentToolScreen = (state: RootState) => state.screen.currentToolScreen
export const selectCurrentSettingScreen = (state: RootState) => state.screen.currentSettingScreen
export default screenSlice.reducer;



