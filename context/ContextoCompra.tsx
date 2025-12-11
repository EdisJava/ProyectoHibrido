import React, { createContext, ReactNode, useContext, useState } from 'react';

interface PurchaseContextType {
    hasPurchased: boolean;
    setPurchased: (value: boolean) => void;
    resetPurchase: () => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: ReactNode }) {
    const [hasPurchased, setHasPurchased] = useState(false);

    const setPurchased = (value: boolean) => {
        setHasPurchased(value);
    };

    const resetPurchase = () => {
        setHasPurchased(false);
    };

    return (
        <PurchaseContext.Provider value={{ hasPurchased, setPurchased, resetPurchase }}>
            {children}
        </PurchaseContext.Provider>
    );
}

export function usePurchase() {
    const context = useContext(PurchaseContext);
    if (context === undefined) {
        throw new Error('usePurchase must be used within a PurchaseProvider');
    }
    return context;
}
