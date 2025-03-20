// export const baseUrl = 'https://back5.maylandlabs.com';

// export const baseUrl = 'http://localhost:8010';
export const baseUrl = "http://10.0.2.2:8010";

export const apiUrls = {
  // user Auth
  logIn: () => `${baseUrl}/api/auth/log-in`,
  signUp: () => `${baseUrl}/api/auth/sign-up`,
  verifyCode: () => `${baseUrl}/api/user/verify-code`,
  googleSignIn: () => `${baseUrl}/api/auth/log-in-with-google`,
  resendVerifyCode: () => `${baseUrl}/api/auth/resend-code`,
  refreshToken: () => `${baseUrl}/api/auth/refresh-token`,
  logOut: () => `${baseUrl}/api/auth/log-out`,
  forgetPassword: () => `${baseUrl}/api/auth/forget-password`,
  forgetPasswordCode: () => `${baseUrl}/api/auth/forget-password-code`,
  verifyEmail: () => `${baseUrl}/api/auth/verify-email`,
  setPassword: () => `${baseUrl}/api/auth/forget-password-new-password`,
  getUser: () => `/api/user`,
  updateFirstData: () => `${baseUrl}/api/user/first-data`,
  updateSecondData: () => `${baseUrl}/api/user/second-data`,
  updateDataId: (id: string)=> `${baseUrl}/api/user/${id}`,
};

export const tokenAccess = {
  tokenName: '1dsaaaassfsssrf2faaaaaa',
  refreshTokenName: '1s5s5d4sss1dsd4ssds',
};