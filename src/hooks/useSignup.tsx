import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null); // Explicitly type the error state
  const [isPending, setIsPending] = useState<boolean>(false); // Set initial value to false

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) {
        throw new Error("Could not complete Signup");
      }

      // add display name to user
      await res.user?.updateProfile({ displayName: displayName });

      // Send email verification
      await res.user?.sendEmailVerification();
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
