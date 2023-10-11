import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppScreenState {
    calculatorCurrentScreen: string
    currentToolScreen: string
}

const initialState: AppScreenState = {
    calculatorCurrentScreen: "investment",
    currentToolScreen: "home_view"
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
    }
});

export const { setCalculatorCurrentScreen, setCurrentToolScreen } = screenSlice.actions;

export const selectCalculatorCurrentScreen = (state: RootState) => state.screen.calculatorCurrentScreen
export const selectCurrentToolScreen = (state: RootState) => state.screen.currentToolScreen
export default screenSlice.reducer;



