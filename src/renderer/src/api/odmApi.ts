import axios from "axios";

export const oneadInfo = axios.create({
  baseURL: 'https://staging-odm.onead.tw/',
  withCredentials: true
})

export const oneadOss = axios.create({
  baseURL: 'https://staging-oss.onead.tw/',
  withCredentials: true
})