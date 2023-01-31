import axios from "axios";

export const oneadInfo = axios.create({
  baseURL: 'https://staging-odm.onead.tw/',
  withCredentials: false
})