import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";

interface IAuthContextProps {
  authToken: string | null;
  setAuthToken: (authToken: string | null) => void;
  userDetails: { username?: string; email?: string; password?: string } | null;
  setUserDetails: (details: {
    username: string;
    email: string;
    password?: string;
  }) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const MyAuthContext = createContext({} as IAuthContextProps);

type Props = PropsWithChildren;

export const ContextProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<{
    username?: string;
    email?: string;
    password?: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("email");

      setAuthToken(token);
      setIsAuthenticated(!!token && !!email);

      const username = localStorage.getItem("username");
      if (username && email) {
        setUserDetails({ username, email });
      }
    }
  }, []);

  return (
    <MyAuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        userDetails,
        setUserDetails,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </MyAuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(MyAuthContext);
