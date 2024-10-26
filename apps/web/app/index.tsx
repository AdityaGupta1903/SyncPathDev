"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface MyContextType {
  selectedZap: number;
  setSelectedZap: Dispatch<SetStateAction<number>>;
}

export const ZapContext = createContext<MyContextType>({selectedZap:-1,setSelectedZap: () => {}});
export default function Session({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [selectedZap, setSelectedZap] = useState<number>(-1);
  return (
    <ZapContext.Provider value={{ selectedZap, setSelectedZap }}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ZapContext.Provider>
  );
}

