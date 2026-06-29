import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function Failure() {
  return (
    <Layout>
        <div style={{ padding: 40, textAlign: "center" }}>
        <h1>❌ Pago rechazado</h1>
        <p>Hubo un problema con el pago.</p>

        <Link to="/carrito">Volver al carrito</Link>
        </div>
    </Layout>
  );
}