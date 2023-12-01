import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      //dispatch login action
      if (res.user) {
        dispatch({ type: "LOGIN", payload: res.user });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
