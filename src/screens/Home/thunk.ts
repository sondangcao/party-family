import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosConfig';

interface LoginResponse {
  access_token: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post('/auth/login', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  },
);
