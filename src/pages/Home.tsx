import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import ProductoCard from "../components/ProductoCard";
import type { Producto, Tag } from "../types/Producto";
import Layout from "../components/layout/Layout";
import Hero from "../components/layout/Hero";
import Categories from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";

const PAGE_SIZE = 8;

export default function Home() {
  const { cliente } = useAuth();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Promise.all([
      api.get("/productos"),
      api.get("/tags"),
    ])
      .then(([prodRes, tagsRes]) => {
        setProductos(prodRes.data);
        setTags(tagsRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filtrado
  const filtered = useMemo(() => {
    if (selectedTag === null) return productos;
    return productos.filter((p) =>
      p.tags?.some((t) => t.id === selectedTag)
    );
  }, [productos, selectedTag]);

  function handleSelectTag(id: number | null) {
    setSelectedTag(id);
    setPage(1);
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return (
      <Layout>
        <Hero />
        <div className="loading-state">Cargando plantas...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero />

      {cliente && (
        <div className="welcome-banner">
          <p>Bienvenido de vuelta, <strong>{cliente.nombre}</strong> — ¿qué planta te llevás hoy?</p>
        </div>
      )}

      <Categories tags={tags} selectedTag={selectedTag} onSelect={handleSelectTag} />

      <section className="products-section">
        <div className="products-header">
          <span className="section-label">Nuestros productos</span>
          <h2 className="section-title">Plantas para cada rincón</h2>
        </div>

        {paginated.length === 0 ? (
          <p className="empty-state">No hay productos en esta categoría.</p>
        ) : (
          <div className="products-grid">
            {paginated.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Página anterior"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`page-btn${n === page ? " page-btn--active" : ""}`}
                onClick={() => setPage(n)}
                aria-label={`Página ${n}`}
                aria-current={n === page ? "page" : undefined}
              >
                {n}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Página siguiente"
            >
              →
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
