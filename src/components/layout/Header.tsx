import "../../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { api } from "../../services/api";

export default function Header() {
  const { cliente, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/clientes/logout");
    } catch {
      // si el token ya no es válido igual limpiamos el estado local
    } finally {
      logout();
      navigate("/");
    }
  }

  return (
    <header className="header">
      <button className="logo" onClick={() => navigate("/")}>Vivero</button>

      <nav className="header-nav">
        <a href="#">Plantas</a>
        <a href="#">Ofertas</a>
        <a href="#">Nosotros</a>
      </nav>

      <div className="header-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input type="text" placeholder="Buscar plantas..." />
      </div>

      <div className="header-actions">
        <button className="header-btn header-cart-btn" onClick={() => navigate("/carrito")} aria-label="Carrito de compras">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </button>

        {cliente ? (
          <>
            <span className="header-username">Hola, {cliente.nombre}</span>
            <button className="header-btn" onClick={handleLogout} aria-label="Cerrar sesión">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </>
        ) : (
          <button className="header-btn-text" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
}
