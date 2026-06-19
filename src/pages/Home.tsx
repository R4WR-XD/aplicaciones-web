import { useEffect, useState } from "react";
import { api } from "../services/api";
import ProductoCard from "../components/ProductoCard";
import type { Producto } from "../types/Producto";
import Layout from "../components/layout/Layout";
import Hero from "../components/layout/Hero";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/productos")
      .then((res) => {
        setProductos(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Cargando productos...</h2>;

  return (
    <Layout>
        <Hero />
        <div className="container">
        <div className="products-grid">
            {productos.map((producto) => (
            <ProductoCard
                key={producto.id}
                producto={producto}
            />
            ))}
        </div>
        </div>
    </Layout>
  );
}