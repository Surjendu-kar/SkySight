import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { projectAuth } from "../firebase/config";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
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
      state; // if the type is not match then it will return the same state
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    //its used to update the state
    // useReducer take 2 argu 1 is reducer-fun and anotherone is initial state
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("authContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {/* used to control Signup,login,logout */}
      {children}
      {/* here the children is App component */}
    </AuthContext.Provider>
  );
};
