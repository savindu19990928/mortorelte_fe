"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type GlobalState = {
    cartCount: number | null;
    setCartCount: (cartCount: number | null) => void;
};

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState<number | null>(null);

    return (
        <GlobalContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalState must be used within GlobalProvider");
    }
    return context;
};
