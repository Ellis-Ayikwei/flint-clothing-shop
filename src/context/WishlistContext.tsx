import React, { createContext, useContext, useState } from 'react';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
}

interface WishlistContextType {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<WishlistItem[]>([]);

    const addItem = (item: WishlistItem) => {
        setItems((prev) => {
            if (!prev.some((i) => i.id === item.id)) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const isInWishlist = (id: number) => {
        return items.some((item) => item.id === id);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    return <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearWishlist }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
