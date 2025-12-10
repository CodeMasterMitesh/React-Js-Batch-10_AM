import React, { createContext, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

const initialCart = [
  {
    id: "cart-1",
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: "cart-2",
    name: "Smart Watch Series X",
    price: 399.99,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  },
  {
    id: "cart-3",
    name: "Leather Backpack",
    price: 89.99,
    qty: 2,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
  },
];

export const ModalProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartItems, setCartItems] = useState(initialCart);
  const [authTab, setAuthTab] = useState("login");

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openAccount = (tab = "login") => {
    setAuthTab(tab);
    setIsAccountOpen(true);
  };
  const closeAccount = () => setIsAccountOpen(false);

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id || `temp-${Date.now()}`,
          name: product.name,
          price: product.price,
          qty: 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.07;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cartItems]);

  const value = {
    isCartOpen,
    openCart,
    closeCart,
    isAccountOpen,
    openAccount,
    closeAccount,
    quickViewProduct,
    openQuickView,
    closeQuickView,
    cartItems,
    addToCart,
    updateQty,
    removeFromCart,
    totals,
    authTab,
    setAuthTab,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
