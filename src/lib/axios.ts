// eslint-disable-next-line import/named
import axios, { AxiosInstance } from 'axios';

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
});

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
});
