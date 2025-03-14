import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
}

const initialState: UserState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoginAction: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    logoutAction: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const {isLoginAction, logoutAction} = authSlice.actions;
export default authSlice.reducer;
