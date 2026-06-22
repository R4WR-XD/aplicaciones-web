import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/cart-drawer.css";

const IMAGEN_DEFAULT = "https://placehold.co/80x80/e8f5e9/2d5a27?text=Planta";

export default function CartDrawer() {
  const { drawerOpen, lastAdded, items, total, itemCount, closeDrawer } = useCart();
  const navigate = useNavigate();

  function handleGoToCart() {
    closeDrawer();
    navigate("/carrito");
  }

  return (
    <>
      <div
        className={`drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={closeDrawer}
      />

      <aside className={`cart-drawer${drawerOpen ? " open" : ""}`} aria-label="Carrito">
        <div className="drawer-header">
          <span className="drawer-title">✓ Agregaste al carrito</span>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Cerrar">✕</button>
        </div>

        {lastAdded && (
          <div className="drawer-last-added">
            <img
              src={lastAdded.producto.img_url || lastAdded.producto.imagen || IMAGEN_DEFAULT}
              alt={lastAdded.producto.nombre}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = IMAGEN_DEFAULT; }}
            />
            <div className="drawer-last-info">
              <span className="drawer-last-nombre">{lastAdded.producto.nombre}</span>
              <span className="drawer-last-calc">
                {lastAdded.cantidad} × ${lastAdded.producto.precio} = <strong>${lastAdded.producto.precio * lastAdded.cantidad}</strong>
              </span>
            </div>
          </div>
        )}

        <div className="drawer-summary-header">
          <span>Tu carrito ({itemCount} {itemCount === 1 ? "artículo" : "artículos"})</span>
        </div>

        <ul className="drawer-items">
          {items.map(({ producto, cantidad }) => (
            <li key={producto.id} className="drawer-item">
              <span className="drawer-item-nombre">{producto.nombre}</span>
              <span className="drawer-item-qty">×{cantidad}</span>
              <span className="drawer-item-sub">${producto.precio * cantidad}</span>
            </li>
          ))}
        </ul>

        <div className="drawer-total">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <div className="drawer-actions">
          <button className="drawer-btn-secondary" onClick={closeDrawer}>
            Seguir viendo
          </button>
          <button className="drawer-btn-primary" onClick={handleGoToCart}>
            Ir al carrito →
          </button>
        </div>
      </aside>
    </>
  );
}
