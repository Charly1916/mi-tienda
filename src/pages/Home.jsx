import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <Helmet>
        <title>Mi Tienda | Inicio</title>
        <meta
          name="description"
          content="Tienda online de tecnología: smartphones, laptops, audio y wearables con envío a todo el país."
        />
      </Helmet>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.badge}>⚡ Nueva colección 2026</p>
          <h1 className={styles.heroTitle}>
            Tecnología que
            <span className={styles.highlight}> potencia</span>
            <br />tu vida
          </h1>
          <p className={styles.heroSubtitle}>
            Descubrí los últimos gadgets, smartphones y accesorios con
            los mejores precios y envío gratis a todo el país.
          </p>
          <div className={styles.heroCta}>
            <Link to="/productos" className={styles.btnPrimary}>
              Ver catálogo
            </Link>
            <Link to="/carrito" className={styles.btnSecondary}>
              Mi carrito
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCircle}>
            <span>⚡</span>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🚚</span>
          <h3>Envío Gratis</h3>
          <p>En compras superiores a $100 a todo el país</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🔒</span>
          <h3>Pago Seguro</h3>
          <p>Todos los medios de pago con encriptación SSL</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>↩️</span>
          <h3>30 días devolución</h3>
          <p>Sin preguntas. Tu satisfacción es nuestra prioridad</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🛡️</span>
          <h3>Garantía Extendida</h3>
          <p>Todos los productos con garantía oficial</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
