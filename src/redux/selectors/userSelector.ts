import {RootState} from '../../types/redux';

export const authSelector = (state: RootState) => state.user.email;
