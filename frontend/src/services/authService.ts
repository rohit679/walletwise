import apiClient from "../api/apiClient";
import { apiEndpoint } from "../common/apiEndpoint";

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const registerUrl = apiEndpoint.register;
  const response = await apiClient.post(registerUrl, payload);
  const { data } = response;

  if (!data || data.error) {
    throw new Error(data?.message || "Registration failed");
  }

  const { accessToken, refreshToken, user } = data.data || {};

  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (user) localStorage.setItem("user", JSON.stringify(user));

  return data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const loginUrl = apiEndpoint.login;
  const response = await apiClient.post(loginUrl, payload);
  const { data } = response;

  if (!data || data.error) {
    throw new Error(data?.message || "Login failed");
  }

  const { accessToken, refreshToken, user } = data.data || {};
  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (user) localStorage.setItem("user", JSON.stringify(user));

  return data;
}

export async function forgotPassword(payload: { email: string }) {
  const forgotPasswordUrl = apiEndpoint.forgotPassword;
  const response = await apiClient.post(forgotPasswordUrl, payload);
  const { data } = response;

  if (!data || data.error) {
    throw new Error(data?.message || "Forgot password request failed");
  }

  return data;
}

export async function resetPassword(payload: {
  email: string;
  token: string;
  newPassword: string;
}) {
  const resetPasswordUrl = apiEndpoint.resetPassword;
  const response = await apiClient.post(resetPasswordUrl, payload);
  const { data } = response;

  if (!data || data.error) {
    throw new Error(data?.message || "Reset password request failed");
  }

  return data;
}
