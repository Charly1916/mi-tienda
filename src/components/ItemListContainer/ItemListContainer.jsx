import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Alert, Col, Form, Pagination, Row, Spinner } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import Item from '../Item/Item';
import ContactForm from '../ContactForm/ContactForm';
import styles from './ItemListContainer.module.css';

const PRODUCTOS_POR_PAGINA = 6;

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getDocs(collection(db, 'Productos'))
      .then((snapshot) => {
        const datos = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
        setProductos(datos);
      })
      .catch((err) => {
        console.error('Error al cargar productos desde Firebase:', err);
        setError('No pudimos cargar los productos. Intentá recargar la página.');
      })
      .finally(() => setLoading(false));
  }, []);

  const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))];

  // 1. Filtrado por categoría, 2. filtrado en tiempo real por texto de búsqueda.
  const productosFiltrados = useMemo(() => {
    return productos
      .filter((p) => (filtro === 'Todos' ? true : p.categoria === filtro))
      .filter((p) => p.nombre?.toLowerCase().includes(busqueda.toLowerCase()));
  }, [productos, filtro, busqueda]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA)
  );

  const productosPagina = productosFiltrados.slice(
    (paginaActual - 1) * PRODUCTOS_POR_PAGINA,
    paginaActual * PRODUCTOS_POR_PAGINA
  );

  // Si cambia el filtro/búsqueda y la página actual queda fuera de rango, la reseteamos.
  useEffect(() => {
    setPaginaActual(1);
  }, [filtro, busqueda]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center py-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        ⚠️ {error}
      </Alert>
    );
  }

  return (
    <section>
      {greeting && <p className={styles.greeting}>{greeting}</p>}

      <div className={styles.topBar}>
        <h2 className={styles.titulo}>Catálogo de Productos</h2>
        <div className={styles.filtros}>
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`${styles.filtroBtn} ${filtro === cat ? styles.activo : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Row className="mb-4">
        <Col xs={12} md={6} lg={4}>
          <Form.Group className="position-relative">
            <FaSearch
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888',
              }}
            />
            <Form.Control
              type="text"
              placeholder="Buscar productos por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
          </Form.Group>
        </Col>
      </Row>

      {productos.length === 0 ? (
        <Alert variant="info">
          Todavía no hay productos cargados en Firebase. Si sos administrador,
          iniciá sesión y cargá el catálogo desde el{' '}
          <Link to="/admin">Panel de administración</Link>.
        </Alert>
      ) : (
        <>
          <Row className="g-4">
            {productosPagina.map((producto) => (
              <Col key={producto.id} xs={12} sm={6} lg={4}>
                <Item producto={producto} />
              </Col>
            ))}
          </Row>

          {productosFiltrados.length === 0 && (
            <p className="text-center text-muted mt-4">
              No encontramos productos que coincidan con tu búsqueda.
            </p>
          )}

          {totalPaginas > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
              />
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                <Pagination.Item
                  key={num}
                  active={num === paginaActual}
                  onClick={() => setPaginaActual(num)}
                >
                  {num}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
              />
            </Pagination>
          )}
        </>
      )}

      <ContactForm />
    </section>
  );
}

export default ItemListContainer;
