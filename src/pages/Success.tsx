import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Layout from "../components/layout/Layout";
import type { CartItem } from "../types/Cart";
import { api } from "../services/api";
import "../styles/success.css";

interface OrderSnapshot {
  items: CartItem[];
  total: number;
  date: string;
}

export default function Success() {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [ventaError, setVentaError] = useState<string | null>(null);

  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id");
  const invoiceNumber = paymentId ? `VIV-${paymentId}` : `VIV-${Date.now()}`;

  useEffect(() => {
    const raw = sessionStorage.getItem("vivero_last_order");
    console.log("[Success] snapshot en sessionStorage:", raw);

    if (raw) {
      const parsed: OrderSnapshot = JSON.parse(raw);
      setOrder(parsed);
      sessionStorage.removeItem("vivero_last_order");

      const fecha = new Date(parsed.date).toISOString().split("T")[0];
      const body = {
        fecha,
        productos: parsed.items.map(({ producto, cantidad }) => ({
          idproducto: producto.id,
          cantidad,
          preciounitario: producto.precio,
        })),
      };
      console.log("[Success] POST /ventas body:", body);

      api.post("/ventas", body)
        .then((res) => console.log("[Success] venta guardada:", res.data))
        .catch((err) => {
          console.error("[Success] error al guardar venta:", err.response?.data ?? err.message);
          setVentaError("No se pudo registrar la compra en el sistema.");
        });
    } else {
      console.warn("[Success] no se encontró snapshot del pedido en sessionStorage");
    }
    clearCart();
  }, []);

  const fecha = order
    ? new Date(order.date).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  return (
    <Layout>
      <div className="success-page">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1 className="success-title">¡Pago aprobado!</h1>
          <p className="success-subtitle">Tu compra se realizó correctamente.</p>
        </div>

        {ventaError && (
          <p style={{ color: "#b91c1c", textAlign: "center", marginBottom: "1rem", fontSize: "0.85rem" }}>
            {ventaError}
          </p>
        )}

        <div className="factura">
          <div className="factura-header">
            <div className="factura-marca">
              <span className="factura-marca-nombre">Vivero</span>
              <span className="factura-marca-tagline">Plantas & Naturaleza</span>
            </div>
            <div className="factura-meta">
              <span className="factura-numero">Factura {invoiceNumber}</span>
              <span className="factura-fecha">{fecha}</span>
            </div>
          </div>

          <div className="factura-divider" />

          {order ? (
            <>
              <table className="factura-tabla">
                <thead>
                  <tr>
                    <th className="col-producto">Producto</th>
                    <th className="col-cant">Cant.</th>
                    <th className="col-precio">Precio unit.</th>
                    <th className="col-subtotal">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(({ producto, cantidad }) => (
                    <tr key={producto.id}>
                      <td className="col-producto">{producto.nombre}</td>
                      <td className="col-cant">{cantidad}</td>
                      <td className="col-precio">${producto.precio.toLocaleString("es-AR")}</td>
                      <td className="col-subtotal">
                        ${(producto.precio * cantidad).toLocaleString("es-AR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="factura-divider" />

              <div className="factura-totales">
                <div className="factura-total-row">
                  <span>Subtotal</span>
                  <span>${order.total.toLocaleString("es-AR")}</span>
                </div>
                <div className="factura-total-row">
                  <span>Envío</span>
                  <span className="factura-gratis">Gratis</span>
                </div>
                <div className="factura-total-row factura-total-final">
                  <span>Total</span>
                  <span>${order.total.toLocaleString("es-AR")}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="factura-sin-datos">
              No se encontraron detalles de la compra.
            </p>
          )}

          <div className="factura-footer">
            Gracias por tu compra. Este comprobante es ficticio con fines académicos.
          </div>
        </div>

        <div className="success-actions">
          <Link to="/" className="success-btn-primary">Seguir comprando</Link>
        </div>
      </div>
    </Layout>
  );
}
