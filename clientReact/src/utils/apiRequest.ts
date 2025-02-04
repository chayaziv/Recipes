import axios, { AxiosError } from "axios";
import { RequestData } from "../types/response";

interface ApiRequest {
  method: "get" | "post" | "put" | "delete";
  path: string;
  payload?: RequestData;
  headers?: { [key: string]: string };
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

const basePath = "http://localhost:3000/api";

export const apiRequest = async <T>({
  method,
  path,
  payload,
  headers,
}: ApiRequest): Promise<ApiResponse<T>> => {
  try {
    const res = await axios({
      method,
      url: `${basePath}${path}`,
      data: payload, // Fix: change 'payload' to 'data'
      headers,
    });
    const ddd: T = res.data;
    return { ok: true, data: ddd };
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const { status, data }: { status: number; data: any } = err.response;
      let dataMessage;
      if ([400, 401, 403, 404].includes(status)) {
        dataMessage = data.message;
      } else {
        dataMessage = "An unexpected error occurred.";
      }
      return { ok: false, error: dataMessage };
    }
    return { ok: false, error: "Network error or no response received." };
  }
};

export default apiRequest;
