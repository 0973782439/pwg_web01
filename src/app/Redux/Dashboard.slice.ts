import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DashBoardState {
    isAuthenticated: boolean;
}
const initialState: DashBoardState = {
    isAuthenticated: false
};
export const DashBoardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        login: (state, actions: PayloadAction) => { },

    },
});
export const DashBoardActions = DashBoardSlice.actions;
export default DashBoardSlice.reducer;
