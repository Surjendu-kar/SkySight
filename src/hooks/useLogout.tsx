import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign th user out
    try {
      await projectAuth.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      //ADD cleanup fun
      console.log(error.message);
      setError(error.message);
    } finally {
      // This block will always execute after the try or catch block
      // if (!isCancelled) {
      setIsPending(false);
      // }
    }
  };

  return { logout, error, isPending };
};
