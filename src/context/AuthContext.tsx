import { createContext, useContext, useState, type ReactNode } from "react";
import type { Cliente } from "../types/Cliente";

interface AuthState {
  token: string | null;
  cliente: Cliente | null;
}

interface AuthContextValue extends AuthState {
  login: (token: string, cliente: Cliente) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "vivero_token";
const CLIENTE_KEY = "vivero_cliente";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(CLIENTE_KEY);
    const cliente = raw ? (JSON.parse(raw) as Cliente) : null;
    return { token, cliente };
  });

  function login(token: string, cliente: Cliente) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CLIENTE_KEY, JSON.stringify(cliente));
    setState({ token, cliente });
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CLIENTE_KEY);
    setState({ token: null, cliente: null });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
