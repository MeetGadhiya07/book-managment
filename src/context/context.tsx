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
}

export const MyAuthContext = createContext({} as IAuthContextProps);

type Props = PropsWithChildren;

export const ContextProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      let data = localStorage.getItem("token");
      setAuthToken(data);
    }
  }, []);

  return (
    <MyAuthContext.Provider
      value={{
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </MyAuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(MyAuthContext);
