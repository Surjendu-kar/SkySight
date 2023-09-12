import { useEffect, createContext, useReducer, ReactNode, useMemo } from "react"; // Added ReactNode import here
import { projectAuth } from "../firebase/config";

interface User {
  uid: string;
  email: string | null; // Adjust this line
}

interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: User | null };

export const AuthContext = createContext<
  AuthState & { dispatch: React.Dispatch<AuthAction> }
>({ user: null, authIsReady: false, dispatch: () => { } });

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  // reducer , here we update the state and return a new state
  // switch is used to check action type
  switch (
  action.type // check login or logout
  ) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state; // if the type is not match then it will return the same state
  }
};
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    //its used to update the state
    // useReducer take 2 argu 1 is reducer-fun and anotherone is initial state
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(
      (user: User | null) => {
        dispatch({ type: "AUTH_IS_READY", payload: user });
        unsub();
      }
    );
  }, []);

  // use useMomo to prevent re-rendering
  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }), // here we pass the state and dispatch
    [state]
  );

  return (
    <AuthContext.Provider value={value}>
      {/* used to control Signup,login,logout */}
      {children}
      {/* here the children is App component */}
    </AuthContext.Provider>
  );
};
