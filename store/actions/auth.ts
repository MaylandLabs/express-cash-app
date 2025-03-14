import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { decode as atob } from 'base-64';
import { jwtDecode } from 'jwt-decode';

import { getItem, setItem, removeItem } from '../../utils/storage';
import { apiUrls, tokenAccess, baseUrl } from '../api/index';
import { useAppDispatch } from '../index';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 35000,
  headers: {
    'X-Platform': 'iOS',
    'X-App-Build-Number': '1.0.0',
  },
});

let interceptor = 0;

const setupAxiosInterceptors = (dispatch: ReturnType<typeof useAppDispatch>) => {
  interceptor = axiosInstance.interceptors.request.use(
    async config => {
      try {
        const token = await getItem(tokenAccess.tokenName);
        const refreshToken = await getItem(tokenAccess.refreshTokenName);
        if (!token || !refreshToken) {
          dispatch(logOutAsync());
          return config;
        }

        const isRefreshTokenExpired = await isRefreshTokenAboutToExpire(refreshToken);
        if (isRefreshTokenExpired) {
          dispatch(logOutAsync());
          return config;
        }

        const isTokenExpired = await isTokenAboutToExpire(token);
        if (isTokenExpired) {
          const response = await axios.post(apiUrls.refreshToken(), {
            refresh_token: refreshToken,
          });
          if (response.data.ok) {
            config.headers['Authorization'] = `Bearer ${response.data.token}`;
            await setItem(tokenAccess.tokenName, response.data.token);
          } else {
            dispatch(logOutAsync());
          }
        } else {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    function (error) {
      return Promise.reject(error);
    },
  );
};

export const registerInAsync = createAsyncThunk(
  'auth/registerInAsync',
  async (
    {
      data,
      tokenNotifications,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        cuil: string;
        phone: string;
        birthday: string;
        zipcode: string;
      };
      tokenNotifications: string;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      console.log(data)
      const response = await axios.post(apiUrls.signUp(), { ...data, tokenNotifications });
      if (response.data.ok) {
        await setItem(tokenAccess.tokenName, response.data.token);
        await setItem(tokenAccess.refreshTokenName, response.data.refreshToken);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        dispatch(getUserAsync());
        return response.data;
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const verifyCodeAsync = createAsyncThunk(
  'auth/verifyCodeAsync',
  async (
    { code }: { code: string },
    { rejectWithValue }
  ) => {
    try {
      const token = await getItem(tokenAccess.tokenName);
      if (!token) {
        return rejectWithValue("No se encontró el token de autenticación");
      }
      const response = await axiosInstance.post(apiUrls.verifyCode(), { code });
      if (response.data.ok) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al verificar el código');
    }
  }
);


export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async (
    {
      data,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        token: string;
        code: string;
        password: string;
        confirmPassword: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.setPassword(), { ...data });
      if (response.data.ok) {
        setActive(false);
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Error al cambiar la contraseña';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (
    {
      token,
      tokenNotifications,
      setActive,
      setError,
      dispatch,
      onSuccess,
    }: {
      token: string;
      tokenNotifications: string;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
      onSuccess?: () => Promise<void>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.googleSignIn(), { token, tokenNotifications });
      if (response.data.ok) {
        await setItem(tokenAccess.tokenName, response.data.token);
        await setItem(tokenAccess.refreshTokenName, response.data.refreshToken);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        dispatch(getUserAsync());
        
        if (onSuccess) {
          await onSuccess();
        }
        
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const logInAsync = createAsyncThunk(
  'auth/logInAsync',
  async (
    {
      data,
      tokenNotifications,
      setActive,
      setError,
      dispatch,
      onSuccess,
    }: {
      data: {
        email: string;
        password: string;
      };
      tokenNotifications: string;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
      onSuccess?: () => Promise<void>;
    },
    { rejectWithValue },
  ) => {
    console.log("data", data)
    setActive(true);
    try {
      const response = await axios.post(apiUrls.logIn(), { ...data, tokenNotifications });
      console.log("response", response.data)
      if (response.data.ok) {
        await setItem(tokenAccess.tokenName, response.data.token);
        await setItem(tokenAccess.refreshTokenName, response.data.refreshToken);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        dispatch(getUserAsync());
        if (onSuccess) {
          await onSuccess();
        }
        
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      console.log("error", error)
      setActive(false);
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      console.log("message", message)
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const verifyEmail = createAsyncThunk(
  'auth/verify_email',
  async (
    {
      data,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        userId: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.verifyEmail(), { userId: data.userId });
      if (response.data.ok) {
        setActive(false);
        dispatch(getUserAsync());
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Email no encontrado';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const forgetPassword = createAsyncThunk(
  'auth/forget_password',
  async (
    {
      data,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.forgetPassword(), { email: data.email });
      if (response.data.ok) {
        setActive(false);
        return response.data.token;
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Email no encontrado';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const verifySessionAsync = createAsyncThunk(
  'auth/verifySessionAsync',
  async ({ dispatch }: { dispatch: ReturnType<typeof useAppDispatch> }, { rejectWithValue }) => {
    const isValidate = await validateToken();
    if (!isValidate) {
      await deleteAccess();
      return rejectWithValue('error');
    }
    try {
      setupAxiosInterceptors(dispatch);
      await dispatch(getUserAsync());
      return {};
      // eslint-disable-next-line
    } catch (error: any) {
      await deleteAccess();
      return rejectWithValue('error');
    }
  },
);

const deleteAccess = async () => {
  try {
    if (await validateToken()) {
      const token = await getItem(tokenAccess.tokenName);
      await axios.post(
        apiUrls.logOut(),
        {},
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } finally {
    await removeItem(tokenAccess.tokenName);
    await removeItem(tokenAccess.refreshTokenName);    
  }
};

export const validateToken = async () => {
  const token = await getItem(tokenAccess.tokenName);
  if (!token) {
    return false;
  }
  const refreshToken = await getItem(tokenAccess.refreshTokenName);
  if (!refreshToken) {
    return false;
  }
  if (await isRefreshTokenAboutToExpire(refreshToken)) {
    return false;
  }
  if (await isTokenAboutToExpire(token)) {
    const updated = await updatedToken();
    if (!updated) {
      return false;
    }
  }
  return true;
};

const isRefreshTokenAboutToExpire = async (refreshtoken: string, extraTimeInSeconds = 30) => {
  try {
    if (!refreshtoken) {
      return true;
    }
    const decodedToken = customJwtDecode(refreshtoken);
    const currentTime = Date.now() / 1000;
    const expirationTime = decodedToken.payload.exp;
    if (expirationTime !== undefined) {
      return expirationTime - currentTime <= extraTimeInSeconds;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

const customJwtDecode = (token: string) => {
  // Decodifica el token base64 utilizando atob de base-64
  const tokenParts = token.split('.');
  const header = JSON.parse(atob(tokenParts[0]));
  const payload = JSON.parse(atob(tokenParts[1]));

  return {
    header,
    payload,
    signature: tokenParts[2],
  };
};

export const getSessionRegularId = async () => {
  const token = await getItem(tokenAccess.tokenName);
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode<any>(token);
  return decodedToken.sessionId;
};

const isTokenAboutToExpire = async (token: string, extraTimeInSeconds = 30) => {
  try {
    if (!token) {
      return true;
    }
    const decodedToken = customJwtDecode(token);
    const currentTime = Date.now() / 1000;
    const expirationTime = decodedToken.payload.exp;
    if (expirationTime !== undefined) {
      return expirationTime - currentTime <= extraTimeInSeconds;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

const updatedToken = async () => {
  const refreshToken = await getItem(tokenAccess.refreshTokenName);
  if (!refreshToken) {
    return false;
  }
  try {
    const response = await axios.post(apiUrls.refreshToken(), {
      refresh_token: refreshToken,
    });
    if (response.data.ok) {
      await setItem(tokenAccess.tokenName, response.data.token);
      return true;
    } else {
      return false;
    }
    // eslint-disable-next-line
  } catch (error: any) {
    return false;
  }
};

export const logOutAsync = createAsyncThunk('auth/logOutAsync', async (_, { rejectWithValue }) => {
  try {
    await deleteAccess();
    return {};
    // eslint-disable-next-line
  } catch (error: any) {
    rejectWithValue('error');
  } finally {
    axiosInstance.interceptors.request.eject(interceptor);
  }
});

export const getUserAsync = createAsyncThunk(
  'auth/getUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getItem(tokenAccess.tokenName);

      const response = await axiosInstance.get(apiUrls.getUser());

      if (response.data.ok) {
        return response.data;
      } else {
        return rejectWithValue('error');
      }
    } catch (error) {
      console.error('Error en getUserAsync:', error);
      return rejectWithValue('error');
    }
  },
);

export const forgetPasswordCode = createAsyncThunk(
  'auth/forget-password-code',
  async ({
    token,
    code,
    setError,
    setIsSubmitting,
    routerNext,
  }: {
    token: string;
    code: string;
    setError: (error: string) => void;
    setIsSubmitting: (boolean: boolean) => void;
    routerNext: () => void;
  }) => {
    try {
      setError('');
      const response = await axiosInstance.post(apiUrls.forgetPasswordCode(), {
        code,
        token,
      });
      console.log("response", response.data)
      if (response.data.ok) {
        setIsSubmitting(false);
        routerNext();
        return response.data.code;
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
  },
);

