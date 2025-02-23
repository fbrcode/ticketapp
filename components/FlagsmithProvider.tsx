"use client";
import { createContext, useContext, useEffect, useState } from "react";
import flagsmith from "flagsmith";

interface FlagsmithContextType {
  isInitialized: boolean;
}

const FlagsmithContext = createContext<FlagsmithContextType>({
  isInitialized: false,
});

export const useFlagsmith = () => useContext(FlagsmithContext);

export function FlagsmithProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    flagsmith
      .init({
        environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENV_ID || "default",
        defaultFlags: {
          ticketPieChartEnabled: {
            enabled: true,
          },
        },
      })
      .then(() => setIsInitialized(true));
  }, []);

  return (
    <FlagsmithContext.Provider value={{ isInitialized }}>
      {children}
    </FlagsmithContext.Provider>
  );
}
