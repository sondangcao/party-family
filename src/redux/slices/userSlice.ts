import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const {setUserAction} = userSlice.actions;
export default userSlice.reducer;
