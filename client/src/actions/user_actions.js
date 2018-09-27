import axios from "axios";
import { USER_SERVER } from "../components/utils/misc";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";

export async function auth() {
  const resp = await axios.get(`${USER_SERVER}/auth`);
  const request = resp.data;

  return {
    type: AUTH_USER,
    payload: request
  };
}

export async function loginUser(dataToSubmit) {
  const resp = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
  const request = resp.data;
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export async function registerUser(dataToSubmit) {
  const resp = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
  const request = resp.data;
  return {
    type: REGISTER_USER,
    payload: request
  };
}

export async function logoutUser() {
  const resp = await axios.get(`${USER_SERVER}/logout`);
  const request = resp.data;
  return {
    type: LOGOUT_USER,
    payload: request
  };
}
