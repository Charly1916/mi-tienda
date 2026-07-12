import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCarrito } from '../../context/CarritoContext';
import styles from './Item.module.css';

// Imagen de reemplazo (sin depender de ningún servicio externo) para cuando
// la URL cargada en Firebase esté rota o inaccesible.
const IMAGEN_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='sans-serif' font-size='18'%3EImagen no disponible%3C/text%3E%3C/svg%3E";

function Item({ producto }) {
  const { id, nombre, precio, categoria, imagen, stock, rating } = producto;
  const { agregarAlCarrito, getCantidadPorId } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const cantidadEnCarrito = getCantidadPorId(id);

  const handleImagenError = (e) => {
    e.target.onerror = null;
    e.target.src = IMAGEN_PLACEHOLDER;
  };

  const handleAgregar = () => {
    if (stock > 0) {
      agregarAlCarrito(producto, cantidad);
    }
  };

  return (
    <Card className={`h-100 ${styles.card}`}>
      <Card.Img
        variant="top"
        src={imagen || IMAGEN_PLACEHOLDER}
        alt={nombre}
        className={styles.image}
        onError={handleImagenError}
      />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">
          {categoria}
        </Badge>
        <Card.Title className={styles.nombre}>{nombre}</Card.Title>
        <div className="d-flex align-items-center gap-1 mb-2 text-warning">
          <FaStar />
          <span className="text-body">{rating}</span>
        </div>
        <Card.Text className={styles.precio}>
          ${precio.toLocaleString('es-AR')}
        </Card.Text>
        <p className={styles.stock}>
          {stock > 0 ? `✓ ${stock} en stock` : '✗ Sin stock'}
        </p>

        {cantidadEnCarrito > 0 && (
          <p className="small text-muted mb-2">
            Ya tenés {cantidadEnCarrito} en el carrito
          </p>
        )}

        <div className="d-flex align-items-center gap-2 mb-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          >
            -
          </Button>
          <span>{cantidad}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setCantidad((c) => Math.min(stock || 1, c + 1))}
          >
            +
          </Button>
        </div>

        <div className="mt-auto d-flex flex-column gap-2">
          <Button
            variant="primary"
            disabled={stock === 0}
            onClick={handleAgregar}
          >
            <FaShoppingCart className="me-2" />
            Agregar al carrito
          </Button>
          <Link to={`/producto/${id}`} className={styles.btn}>
            Ver detalle
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Item;
