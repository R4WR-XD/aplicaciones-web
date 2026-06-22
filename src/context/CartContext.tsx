import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Producto } from "../types/Producto";
import { useAuth } from "./AuthContext";

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  drawerOpen: boolean;
  lastAdded: CartItem | null;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartKey(userId: number) {
  return `vivero_cart_${userId}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { cliente } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  useEffect(() => {
    if (!cliente) {
      setItems([]);
      return;
    }
    const raw = localStorage.getItem(cartKey(cliente.id));
    setItems(raw ? JSON.parse(raw) : []);
  }, [cliente?.id]);

  useEffect(() => {
    if (!cliente) return;
    localStorage.setItem(cartKey(cliente.id), JSON.stringify(items));
  }, [items, cliente?.id]);

  function addItem(producto: Producto, cantidad: number = 1) {
    const qty = Math.min(cantidad, producto.stock);
    setLastAdded({ producto, cantidad: qty });
    setDrawerOpen(true);
    setItems((prev) => {
      const existing = prev.find((i) => i.producto.id === producto.id);
      if (existing) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: Math.min(i.cantidad + qty, producto.stock) }
            : i
        );
      }
      return [...prev, { producto, cantidad: qty }];
    });
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.producto.id !== id));
  }

  function updateQuantity(id: number, cantidad: number) {
    if (cantidad < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.producto.id === id ? { ...i, cantidad } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  const itemCount = items.reduce((sum, i) => sum + i.cantidad, 0);
  const total = items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      itemCount, total,
      drawerOpen, lastAdded, closeDrawer,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
