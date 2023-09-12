import { useState } from "react";
import { projectAuth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      console.log(res.user);

      if (!res.user) {
        throw new Error("Could not complete Signup");
      }

      // add display name to user
      await updateProfile(res.user, { displayName: displayName });

      // Send email verification
      await sendEmailVerification(res.user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      } else {
        // Handle or log the error differently if it's not an instance of Error
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
