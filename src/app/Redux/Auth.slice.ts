import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAccesTokenLST } from "../../utils/token";
import { ILogIn } from "../../interfaces/index";

interface AuthState {
    isAuthenticated: boolean;
}
const initialState: AuthState = {
    isAuthenticated: Boolean(getAccesTokenLST()),
};
export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions: PayloadAction<ILogIn>) => { },
        loginSucces: (state) => {
            state.isAuthenticated = true;
        },
    },
});
export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
