import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaTrash } from 'react-icons/fa';
import { useCarrito } from '../context/CarritoContext';
import styles from './Cart.module.css';

function Cart() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, getTotal } = useCarrito();

  return (
    <div className={styles.cart}>
      <Helmet>
        <title>Mi Tienda | Carrito de compras</title>
        <meta name="description" content="Revisá los productos de tu carrito de compras." />
      </Helmet>

      <h2 className={styles.titulo}>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛍️</span>
          <h3>Tu carrito está vacío</h3>
          <p>Explorá nuestros productos y agregá lo que más te guste</p>
          <Link to="/productos" className={styles.btn}>
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        width={48}
                        height={48}
                        style={{ objectFit: 'cover', borderRadius: 6 }}
                      />
                      {item.nombre}
                    </td>
                    <td>${item.precio.toLocaleString('es-AR')}</td>
                    <td>{item.cantidad}</td>
                    <td>${(item.precio * item.cantidad).toLocaleString('es-AR')}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarDelCarrito(item.id)}
                        aria-label={`Eliminar ${item.nombre} del carrito`}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
            <Button variant="outline-secondary" onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>
            <h4 className="mb-0">
              Total: ${getTotal().toLocaleString('es-AR')}
            </h4>
          </div>

          <div className="mt-4 d-flex gap-3 flex-wrap">
            <Link to="/productos" className={styles.btn}>
              Seguir comprando
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
