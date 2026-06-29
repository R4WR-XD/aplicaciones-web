import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import "../styles/success.css";

export default function Failure() {
  return (
    <Layout>
      <div className="success-page">
        <div className="success-header">
          <div className="success-icon failure-icon">✕</div>
          <h1 className="success-title failure-title">Pago rechazado</h1>
          <p className="success-subtitle">
            Hubo un problema al procesar tu pago. Tu carrito sigue guardado.
          </p>
        </div>

        <div className="factura failure-card">
          <p className="failure-msg">
            Podés intentarlo de nuevo con otro medio de pago o revisar los datos
            de tu tarjeta.
          </p>
        </div>

        <div className="success-actions">
          <Link to="/carrito" className="success-btn-primary">
            Volver al carrito
          </Link>
        </div>
      </div>
    </Layout>
  );
}
