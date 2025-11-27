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
