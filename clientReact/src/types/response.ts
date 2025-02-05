import { UserType } from "../reducer/userReducer";

export type AuthResponse = {
  message: string;
  user?: UserType;
};

export type RegisterResponse = {
  message: string;
  userId: number;
};


export type AuthorNameResponse = { authorName: string };

type AuthType = {
  email: string;
  password: string;
};
export type RequestData = UserType | AuthType;
