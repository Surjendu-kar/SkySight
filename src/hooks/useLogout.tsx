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
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      } else {
        // Handle or log the error differently if it's not an instance of Error
        setError("An unexpected error occurred.");
      }
    } finally {
      // This block will always execute after the try or catch block
      // if (!isCancelled) {
      setIsPending(false);
      // }
    }
  };

  return { logout, error, isPending };
};
