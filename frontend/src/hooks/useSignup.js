import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api.js";
import { useNavigate } from "react-router-dom";
const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/onboarding");
    },
  });
  return { error, isPending, signupMutation: mutate };
};

export default useSignup;
