import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);

  const signup = async (email, password, displayName) => {
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
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
