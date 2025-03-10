import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  email: string;
  isLogin: boolean;
}

const initialState: UserState = {
  email: '',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.email = action.payload;
    },
    clearUser: state => {
      state.email = '';
    },
    isLoginAction: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const {setUser, clearUser, isLoginAction} = authSlice.actions;
export default authSlice.reducer;
