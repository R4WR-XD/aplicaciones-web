import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Producto } from "../types/Producto";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/producto-detalle.css";

const IMAGEN_DEFAULT =
  "https://placehold.co/600x500/e8f5e9/2d5a27?text=Sin+imagen";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cliente } = useAuth();
  const { addItem } = useCart();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    api.get(`/productos/${id}`)
      .then((res) => setProducto(res.data))
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">Cargando producto...</div>
      </Layout>
    );
  }

  if (notFound || !producto) {
    return (
      <Layout>
        <div className="detalle-not-found">
          <p>Producto no encontrado.</p>
          <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
      </Layout>
    );
  }

  const imagen = producto.img_url || producto.imagen || IMAGEN_DEFAULT;
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
    <Layout>
      <div className="detalle-page">
        <button className="detalle-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <div className="detalle-grid">
          <div className="detalle-imagen">
            <img
              src={imagen}
              alt={producto.nombre}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = IMAGEN_DEFAULT;
              }}
            />
          </div>

          <div className="detalle-info">
            {producto.tags && producto.tags.length > 0 && (
              <div className="detalle-tags">
                {producto.tags.map((tag) => (
                  <span key={tag.id} className="detalle-tag">{tag.nombre}</span>
                ))}
              </div>
            )}

            <h1 className="detalle-nombre">{producto.nombre}</h1>

            {producto.nombre_cientifico && (
              <p className="detalle-cientifico">{producto.nombre_cientifico}</p>
            )}

            <p className="detalle-descripcion">{producto.descripcion}</p>

            <div className="detalle-compra">
              <span className="detalle-precio">${producto.precio}</span>
              <span className={`detalle-stock ${sinStock ? "sin-stock" : ""}`}>
                {sinStock ? "Sin stock" : `${producto.stock} disponibles`}
              </span>
            </div>

            {!sinStock && (
              <div className="detalle-qty-row">
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                    disabled={cantidad <= 1}
                    aria-label="Reducir cantidad"
                  >−</button>
                  <span className="qty-value">{cantidad}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setCantidad((q) => Math.min(producto.stock, q + 1))}
                    disabled={cantidad >= producto.stock}
                    aria-label="Aumentar cantidad"
                  >+</button>
                </div>
                <span className="detalle-qty-total">
                  ${producto.precio} × {cantidad} = <strong>${producto.precio * cantidad}</strong>
                </span>
              </div>
            )}

            <button className="detalle-btn" onClick={handleAddToCart} disabled={sinStock}>
              {sinStock ? "Sin stock" : cliente ? "Agregar al carrito" : "Iniciá sesión para comprar"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
