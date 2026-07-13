import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Alert, Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaTag, FaTimes, FaTrash } from 'react-icons/fa';
import { db } from '../firebase/config';
import { useCarrito } from '../context/CarritoContext';
import styles from './Cart.module.css';

function Cart() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, getTotal } = useCarrito();

  const [codigoCupon, setCodigoCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [errorCupon, setErrorCupon] = useState('');
  const [aplicandoCupon, setAplicandoCupon] = useState(false);

  const subtotal = getTotal();
  const descuento = cuponAplicado ? (subtotal * cuponAplicado.descuento) / 100 : 0;
  const total = subtotal - descuento;

  const handleAplicarCupon = async (e) => {
    e.preventDefault();
    if (!codigoCupon.trim()) return;

    setAplicandoCupon(true);
    setErrorCupon('');
    try {
      const codigoNormalizado = codigoCupon.trim().toUpperCase();
      const consultaCupon = query(
        collection(db, 'cupones'),
        where('codigo', '==', codigoNormalizado)
      );
      const respuesta = await getDocs(consultaCupon);

      if (respuesta.empty) {
        setErrorCupon('El cupón ingresado no es válido.');
        setCuponAplicado(null);
        return;
      }

      const cupon = respuesta.docs[0].data();
      setCuponAplicado({ codigo: codigoNormalizado, descuento: cupon.descuento });
    } catch (err) {
      console.error('Error al validar el cupón:', err);
      setErrorCupon('No pudimos validar el cupón. Intentá de nuevo.');
    } finally {
      setAplicandoCupon(false);
    }
  };

  const handleQuitarCupon = () => {
    setCuponAplicado(null);
    setCodigoCupon('');
    setErrorCupon('');
  };

  const handleVaciarCarrito = () => {
    vaciarCarrito();
    handleQuitarCupon();
  };

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

          <div className={styles.cuponBox}>
            <Form onSubmit={handleAplicarCupon}>
              <Form.Label className="fw-semibold">
                <FaTag className="me-1" /> Código de descuento
              </Form.Label>
              <InputGroup style={{ maxWidth: 360 }}>
                <Form.Control
                  type="text"
                  placeholder="Ej: VERANO10"
                  value={codigoCupon}
                  onChange={(e) => setCodigoCupon(e.target.value)}
                  disabled={!!cuponAplicado}
                  style={{ textTransform: 'uppercase' }}
                />
                {cuponAplicado ? (
                  <Button variant="outline-danger" onClick={handleQuitarCupon}>
                    <FaTimes className="me-1" /> Quitar
                  </Button>
                ) : (
                  <Button variant="outline-primary" type="submit" disabled={aplicandoCupon}>
                    {aplicandoCupon ? <Spinner animation="border" size="sm" /> : 'Aplicar'}
                  </Button>
                )}
              </InputGroup>
            </Form>

            {errorCupon && (
              <Alert variant="danger" className="mt-2 mb-0 py-2">
                {errorCupon}
              </Alert>
            )}
            {cuponAplicado && (
              <Alert variant="success" className="mt-2 mb-0 py-2">
                Cupón <strong>{cuponAplicado.codigo}</strong> aplicado: {cuponAplicado.descuento}%
                de descuento.
              </Alert>
            )}
          </div>

          <div className={styles.resumen}>
            <div className={styles.resumenLinea}>
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString('es-AR')}</span>
            </div>
            {cuponAplicado && (
              <div className={`${styles.resumenLinea} ${styles.resumenDescuento}`}>
                <span>Descuento ({cuponAplicado.descuento}%)</span>
                <span>-${descuento.toLocaleString('es-AR')}</span>
              </div>
            )}
            <div className={`${styles.resumenLinea} ${styles.resumenTotal}`}>
              <span>Total</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
            <Button variant="outline-secondary" onClick={handleVaciarCarrito}>
              Vaciar carrito
            </Button>
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
