import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api.js";
const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { error, isPending: isLoading, loginMutate: mutate };
};

export default useLogin;
