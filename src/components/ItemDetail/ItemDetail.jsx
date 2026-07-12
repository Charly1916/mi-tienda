import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart } from 'react-icons/fa';
import { db } from '../../firebase/config';
import { useCarrito } from '../../context/CarritoContext';
import styles from './ItemDetail.module.css';

function ItemDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setAgregado(false);
    getDoc(doc(db, 'productos', id))
      .then((snap) => {
        if (snap.exists()) {
          setProducto({ id: snap.id, ...snap.data() });
        } else {
          setProducto(null);
        }
      })
      .catch((err) => {
        console.error('Error al cargar el producto:', err);
        setError('No pudimos cargar el producto.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!producto) {
    return (
      <div className={styles.center}>
        <p>Producto no encontrado</p>
        <Link to="/productos" className={styles.back}>← Volver al catálogo</Link>
      </div>
    );
  }

  const { nombre, precio, categoria, descripcion, imagen, stock, rating } = producto;
  const estrellas = '★'.repeat(Math.floor(rating || 0)) + '☆'.repeat(5 - Math.floor(rating || 0));

  return (
    <Container className="py-4">
      <Helmet>
        <title>Mi Tienda | {nombre}</title>
        <meta name="description" content={`Detalles y precio del producto ${nombre}.`} />
      </Helmet>

      <Link to="/productos" className={styles.back}>← Volver al catálogo</Link>

      <Row className="mt-3 g-4">
        <Col xs={12} md={6}>
          <img src={imagen} alt={nombre} className={styles.image} />
        </Col>
        <Col xs={12} md={6}>
          <span className={styles.categoria}>{categoria}</span>
          <h1 className={styles.nombre}>{nombre}</h1>
          <div className={styles.rating}>
            <span className={styles.estrellas}>{estrellas}</span>
            <span className={styles.ratingNum}>{rating} / 5</span>
          </div>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>${Number(precio).toLocaleString('es-AR')}</p>
          <p className={styles.stock}>
            {stock > 0 ? `✓ ${stock} unidades disponibles` : '✗ Sin stock'}
          </p>

          <div className={styles.cantidad}>
            <label htmlFor="cantidad">Cantidad:</label>
            <div className={styles.cantidadControl}>
              <button onClick={() => setCantidad((c) => Math.max(1, c - 1))}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad((c) => Math.min(stock || 1, c + 1))}>+</button>
            </div>
          </div>

          <Button variant="primary" disabled={stock === 0} onClick={handleAgregar}>
            <FaShoppingCart className="me-2" />
            Agregar al carrito
          </Button>

          {agregado && (
            <Alert variant="success" className="mt-3 mb-0">
              Se agregó {cantidad} unidad(es) de {nombre} al carrito.{' '}
              <Link to="/carrito">Ver carrito</Link>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetail;
