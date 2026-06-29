import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Layout from "../components/layout/Layout";
import "../styles/carrito.css";

const IMAGEN_DEFAULT =
  "https://placehold.co/80x80/e8f5e9/2d5a27?text=Planta";

export default function Carrito() {
  const { cliente } = useAuth();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cliente) navigate("/login");
  }, [cliente, navigate]);

  if (!cliente) return null;

  const handleCheckout = async () => {
    const response = await fetch("/api/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();

    sessionStorage.setItem(
      "vivero_last_order",
      JSON.stringify({ items, total, date: new Date().toISOString() })
    );

    window.location.href = data.init_point;
  }

  return (
    <Layout>
      <div className="carrito-page">
        <h1 className="carrito-title">
          Tu carrito {itemCount > 0 && `(${itemCount})`}
        </h1>

        {items.length === 0 ? (
          <div className="carrito-empty">
            <p>Tu carrito está vacío.</p>
            <Link to="/">Explorar plantas →</Link>
          </div>
        ) : (
          <>
            <div className="carrito-list">
              {items.map(({ producto, cantidad }) => (
                <div key={producto.id} className="carrito-item">
                  <img
                    src={producto.img_url || producto.imagen || IMAGEN_DEFAULT}
                    alt={producto.nombre}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = IMAGEN_DEFAULT;
                    }}
                  />

                  <div className="carrito-item-info">
                    <span className="carrito-item-nombre">{producto.nombre}</span>
                    <span className="carrito-item-precio">${producto.precio} c/u</span>
                    <span className="carrito-item-subtotal">
                      ${producto.precio * cantidad}
                    </span>
                  </div>

                  <div className="carrito-item-actions">
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(producto.id, cantidad - 1)}
                        disabled={cantidad <= 1}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="qty-value">{cantidad}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(producto.id, cantidad + 1)}
                        disabled={cantidad >= producto.stock}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(producto.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-resumen">
              <div className="carrito-resumen-row">
                <span>Subtotal ({itemCount} {itemCount === 1 ? "artículo" : "artículos"})</span>
                <span>${total}</span>
              </div>
              <div className="carrito-resumen-row total">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button
                className="carrito-checkout-btn"
                onClick={handleCheckout}
              >
                Finalizar compra →
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
