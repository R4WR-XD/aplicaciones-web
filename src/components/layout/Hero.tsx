import "../../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-gradient" />

      <div className="hero-content">
        <span className="hero-eyebrow">Vivero · Plantas &amp; Jardín</span>

        <h1>Llevá la naturaleza a tu hogar.</h1>

        <p className="hero-sub">
          Selección de plantas de interior y exterior, cactus y suculentas. Cuidadas desde el semillero.
        </p>

        <div className="hero-ctas">
          <button className="hero-btn-primary">Explorar plantas</button>
          <button className="hero-btn-secondary">Ver novedades</button>
        </div>
      </div>
    </section>
  );
}
