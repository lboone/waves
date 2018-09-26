import axios from "axios";
import { USER_SERVER } from "../components/utils/misc";
import { LOGIN_USER, REGISTER_USER } from "./types";

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