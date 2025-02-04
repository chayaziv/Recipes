import { createContext, Dispatch } from "react";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
};

type Action =
  | {
      type: "ADD_USER";
      user: Omit<UserType, "firstName" | "lastName" | "address" | "phone">;
    }
  | {
      type: "UPDATE_USER";
      user: Partial<UserType> & { id: number };
    }
  | {
      type: "DELETE_USER";
      id: number;
    }
  | {
      type: "SET_USER";
      user: UserType;
    };

export const emptyUser: UserType = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  phone: "",
};

export type AuthUser = {
  user: UserType;
  isLogin: boolean;
};

export const initialState: AuthUser = {
  user: emptyUser,
  isLogin: false,
};

export const AuthContext = createContext<{
  auth: AuthUser;
  userDispatch: Dispatch<Action>;
}>({
  auth: initialState,
  userDispatch: () => null,
});

export default (state: AuthUser, action: Action): AuthUser => {

  switch (action.type) {
    case "ADD_USER":
      return {
        user: { ...emptyUser, ...action.user },
        isLogin: true,
      };
    case "DELETE_USER":
      return { user: { ...emptyUser }, isLogin: false };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.user } };

    case "SET_USER":
      return { ...state, user: action.user, isLogin: true };
    default:
      return state;
  }
};
