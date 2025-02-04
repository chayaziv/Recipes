import apiRequest from "./apiRequest";
import {
  AuthorNameResponse,
  AuthResponse,
  RegisterResponse,
} from "../types/response";
import { UserType } from "../reducer/userReducer";

export const login = async (email: string, password: string) => {
  return await apiRequest<AuthResponse>({
    method: "post",
    path: `/user/login`,
    payload: { email, password },
  });
};

export const register = async (email: string, password: string) => {
  return await apiRequest<RegisterResponse>({
    method: "post",
    path: `/user/register`,
    payload: { email, password },
  });
};

export const editUser = async (userId: string, userData: UserType) => {
  return await apiRequest<any>({
    method: "put",
    path: `/user/`,
    payload: userData,
    headers: { "user-id": userId },
  });
};

export const getAuthorNameByRecipeId = async (recipeId: string) => {
  return await apiRequest<AuthorNameResponse>({
    method: "get",
    path: `/recipes/author/name/${recipeId}`,
  });
};
