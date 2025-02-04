import { UserType } from "../reducer/userReducer";

export type AuthResponse = {
  message: string;
  user?: UserType;
};

export type RegisterResponse = {
  message: string;
  userId: number;
};

type ErrorResponse = {
  message: string;
};

export type AuthorNameResponse = { authorName: string };

export type ResponseData =
  | AuthResponse
  | RegisterResponse
  | UserType
  | ErrorResponse
  | AuthorNameResponse;

type AuthType = {
  email: string;
  password: string;
};
export type RequestData = UserType | AuthType;
