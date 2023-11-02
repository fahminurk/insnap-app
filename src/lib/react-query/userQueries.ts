import { INewUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  SignInAccount,
  SignOutAccount,
  createUserAccount,
  getCurrentUser,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      SignInAccount(user),
  });
};
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: SignOutAccount,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getCurrentUser(),
  });
};
