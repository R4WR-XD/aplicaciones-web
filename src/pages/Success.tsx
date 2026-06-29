import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Layout>
        <div style={{ padding: 40, textAlign: "center" }}>
        <h1>🎉 ¡Pago aprobado!</h1>
        <p>Tu compra se realizó correctamente.</p>

        <Link to="/">Volver al inicio</Link>
        </div>
    </Layout>
  );
}