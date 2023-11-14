import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem('user')),
  isLoading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      sessionStorage.setItem('user', JSON.stringify(action.payload));
      return {
        user: action.payload,
        isLoading: false,
      };
    case "LOGIN_FAIL":
      return {
        error: action.error,
        isLoading: false,
      };
    default:
      return INITIAL_STATE;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        isLoading: state.isLoading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
