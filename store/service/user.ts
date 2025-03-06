import { createAsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '..';
import { axiosInstance, getUserAsync } from '../actions/auth';
import { apiUrls } from '../api';
import { AxiosRequestHeaders } from 'axios';
import { router } from 'expo-router';


export const resendVerifyCode = async ({
  setError,
  setIsSubmitting,
}: {
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.resendVerifyCode(), {});
    if (response.data.ok) {
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al enviar el codigo');
  } finally {
    setIsSubmitting(false);
  }
};


export const updateFirstData = async ({
  first_name,
  last_name,
  cuil,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  first_name: string;
  last_name: string;
  cuil: string;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.updateFirstData(), {
      first_name,
      last_name,
      cuil,
    });
    if (response.data.ok) {
      setIsSubmitting(false);
      dispatch(getUserAsync());
      routerNext();
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al iniciar sesión');
  } finally {
    setIsSubmitting(false);
  }
};

export const updateSecondData = async ({
  birthday,
  phone,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  birthday?: Date;
  phone: string;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.updateSecondData(), {
      birthday,
      phone,
    });
    if (response.data.ok) {
      setIsSubmitting(false);
      dispatch(getUserAsync());    
      routerNext();
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al iniciar sesión');
  } finally {
    setIsSubmitting(false);
  }
};

export const updateUserData = async ({
  id,
  first_name,
  last_name,
  cuil,
  phone,
  birthday,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  id: string | number;
  first_name?: string;
  last_name?: string;
  cuil?: string;
  phone?: string;
  birthday?: Date;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const dataToUpdate: {
      first_name?: string;
      last_name?: string;
      cuil?: string;
      phone?: string;
      birthday?: Date;
    } = {
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(cuil && { cuil }),
      ...(phone && { phone }),
      ...(birthday && { birthday }),
    };

    const response = await axiosInstance.put(
      `${apiUrls.updateDataId(id.toString())}`,
      dataToUpdate,
    );
    if (response.data.ok) {
      dispatch(getUserAsync());
      routerNext();
    } else {
      setError(response.data.message);
    }
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al actualizar los datos');
  } finally {
    setIsSubmitting(false);
  }
};
