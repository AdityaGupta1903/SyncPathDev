"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import {
  FluentProvider,
  webLightTheme,
  
} from "@fluentui/react-components";

interface MyContextType {
  selectedZap: number;
  setSelectedZap: Dispatch<SetStateAction<number>>;
}

export const ZapContext = createContext<MyContextType>({
  selectedZap: -1,
  setSelectedZap: () => {},
});
export default function Session({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [selectedZap, setSelectedZap] = useState<number>(-1);
  // console.log(process.env.GOOGLE_CLIENT_ID);
  return (
    <ZapContext.Provider value={{ selectedZap, setSelectedZap }}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
         
            <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
         
        </SessionProvider>
      </QueryClientProvider>
    </ZapContext.Provider>
  );
}
