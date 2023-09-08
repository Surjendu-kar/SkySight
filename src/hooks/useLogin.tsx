import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // if (!isCancelled) {//ADD cleanup fun
      //   setIsPending(false);
      //   setError(null);
      // }
    } catch (error) {
      // if (!isCancelled) {
      //ADD cleanup fun
      console.log(error.message);
      setError(error.message);
      // setIsPending(false);
      // }
    } finally {
      // This block will always execute after the try or catch block
      // if (!isCancelled) {
      setIsPending(false);
      // }
    }
  };

  return { login, error, isPending };
};
