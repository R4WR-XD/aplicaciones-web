import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function Pending() {
  return (
    <Layout>
        <div style={{ padding: 40, textAlign: "center" }}>
        <h1>⏳ Pago pendiente</h1>
        <p>Estamos esperando la confirmación del pago.</p>

        <Link to="/">Volver al inicio</Link>
        </div>
    </Layout>
  );
}