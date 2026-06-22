import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Producto } from "../types/Producto";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const IMAGEN_DEFAULT =
  "https://placehold.co/400x300/e8f5e9/2d5a27?text=Sin+imagen";

interface Props {
  producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
  const navigate = useNavigate();
  const { cliente } = useAuth();
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);

  const sinStock = producto.stock === 0;

  function handleAddToCart() {
    if (!cliente) {
      navigate("/login");
      return;
    }
    addItem(producto, cantidad);
    setCantidad(1);
  }

  return (
    <div className="product-card">
      <img
        src={producto.img_url || producto.imagen || IMAGEN_DEFAULT}
        alt={producto.nombre}
        onClick={() => navigate(`/productos/${producto.id}`)}
        style={{ cursor: "pointer" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = IMAGEN_DEFAULT;
        }}
      />

      <div className="product-card-body">
        <h3
          onClick={() => navigate(`/productos/${producto.id}`)}
          style={{ cursor: "pointer" }}
        >
          {producto.nombre}
        </h3>
        <p>{producto.descripcion}</p>

        {!sinStock && (
          <div className="card-qty-row">
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                disabled={cantidad <= 1}
                aria-label="Reducir"
              >−</button>
              <span className="qty-value">{cantidad}</span>
              <button
                className="qty-btn"
                onClick={() => setCantidad((q) => Math.min(producto.stock, q + 1))}
                disabled={cantidad >= producto.stock}
                aria-label="Aumentar"
              >+</button>
            </div>
            <span className="card-qty-total">${producto.precio * cantidad}</span>
          </div>
        )}

        <div className="product-footer">
          {sinStock && <span className="price">${producto.precio}</span>}
          <button
            className="buy-btn"
            onClick={handleAddToCart}
            disabled={sinStock}
            style={sinStock ? {} : { width: "100%" }}
          >
            {sinStock ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
