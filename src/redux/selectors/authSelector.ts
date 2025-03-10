import {RootState} from '../../types/redux';

export const isLoginSelector = (state: RootState) => state.auth.isLogin;
