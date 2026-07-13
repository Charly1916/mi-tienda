import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaTag, FaUserCog, FaUserPlus } from 'react-icons/fa';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

function Header() {
  const { getCantidadTotal } = useCarrito();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const cantidad = getCantidadTotal();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>TechStore</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Inicio</Link>
          <Link to="/productos" className={styles.navLink}>Productos</Link>
          <Link to="/carrito" className={styles.navLink}>
            <FaShoppingCart />
            Carrito
            {cantidad > 0 && (
              <Badge bg="danger" pill className="ms-1">
                {cantidad}
              </Badge>
            )}
          </Link>

          {usuario ? (
            <>
              <Link to="/admin" className={styles.navLink}>
                <FaUserCog /> Admin
              </Link>
              <Link to="/admin/cupones" className={styles.navLink}>
                <FaTag /> Cupones
              </Link>
              <button onClick={handleLogout} className={styles.navButton}>
                <FaSignOutAlt /> Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                <FaSignInAlt /> Ingresar
              </Link>
              <Link to="/registro" className={styles.navLink}>
                <FaUserPlus /> Registrarme
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
