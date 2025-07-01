import type { BaseQueryApi } from "@reduxjs/toolkit/query";


export interface IInput {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export type TUser = {
  userId:string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
    errorSources: TErrorSource[];
  }
  status: number
}


export type TErrorSource = {
  path: string | number;
  message: string;
};

export type TResponse = {
  data?: any;
  error: TError;
  success: boolean;
  message: string;
  accessToken?: string
}


export type TResponseRedux = TResponse & BaseQueryApi