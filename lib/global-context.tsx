import React, { createContext, useContext, ReactNode } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppWrite";
import { View } from "react-native";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void> | {};
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}


export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const {
      data: user,
      loading,
      refetch,
    } = useAppwrite({
      fn: getCurrentUser,
    });
  
    const refetchWrapper = async (newParams?: Record<string, string | number>) => {
      await refetch(newParams ?? {});
    };
  
    const isLogged = !!user;
    console.log(JSON.stringify(user, null, 2))

    return (
      <GlobalContext.Provider
        value={{
          isLogged,
          user,
          loading,
          refetch: refetchWrapper,
        }}
      >
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </GlobalContext.Provider>
    );
  };

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;