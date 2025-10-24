"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";

export type ParallaxKey = "hero" | "contact" | "about" | "projects";

type ParallaxContextType = {
  selectedKey: ParallaxKey;
  setSelectedKey: Dispatch<React.SetStateAction<ParallaxKey>>;
};

const ParallaxContext = createContext<ParallaxContextType | undefined>(
  undefined
);

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const [selectedKey, setSelectedKey] = useState<ParallaxKey>("hero");

  return (
    <ParallaxContext.Provider
      value={{
        selectedKey,
        setSelectedKey,
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
}

export default function useParallax() {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error("useParallax must be used within a ParallaxProvider");
  }
  return context;
}