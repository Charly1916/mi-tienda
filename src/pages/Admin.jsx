import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Alert, Badge, Button, Container, Modal, Spinner, Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaDatabase, FaEdit, FaTrash } from "react-icons/fa";
import { db } from "../firebase/config";
import FormularioProducto from "../components/FormularioProducto/FormularioProducto";
import { BotonEditar, BotonEliminar } from "../components/BotonesAccion";
import productosSeed from "../data/productosSeed";

const COLECCION = "Productos";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [sembrando, setSembrando] = useState(false);

  const cargarProductos = async () => {
    setCargando(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, COLECCION));
      // Ojo: el spread de d.data() va antes de "id" para que el id real del
      // documento de Firestore siempre prevalezca sobre un posible campo
      // "id" suelto dentro de los datos (por ejemplo, productos cargados a
      // mano que traían un id numérico propio).
      const datos = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
      setProductos(datos);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(
        "No se pudieron cargar los productos desde Firebase. Revisá la conexión o la configuración del proyecto."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleGuardar = async (datosProducto) => {
    setGuardando(true);
    setError("");
    try {
      if (productoAEditar) {
        const ref = doc(db, COLECCION, productoAEditar.id);
        await updateDoc(ref, datosProducto);
      } else {
        await addDoc(collection(db, COLECCION), datosProducto);
      }
      setProductoAEditar(null);
      await cargarProductos();
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setError("Ocurrió un error al guardar el producto. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = (producto) => {
    setProductoAEditar(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmarEliminar = (producto) => setProductoAEliminar(producto);

  const handleEliminar = async () => {
    if (!productoAEliminar) return;
    setError("");
    try {
      await deleteDoc(doc(db, COLECCION, productoAEliminar.id));
      setProductos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      setError("No se pudo eliminar el producto.");
    } finally {
      setProductoAEliminar(null);
    }
  };

  const handleSembrar = async () => {
    setSembrando(true);
    setError("");
    try {
      await Promise.all(
        productosSeed.map((producto) => addDoc(collection(db, COLECCION), producto))
      );
      await cargarProductos();
    } catch (err) {
      console.error("Error al sembrar productos:", err);
      setError("No se pudo cargar el catálogo inicial en Firebase.");
    } finally {
      setSembrando(false);
    }
  };

  return (
    <Container className="py-4">
      <Helmet>
        <title>Mi Tienda | Panel de administración</title>
        <meta name="description" content="Gestión de productos: alta, edición y eliminación." />
      </Helmet>

      <h1 className="mb-4">Panel de administración</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <FormularioProducto
        productoAEditar={productoAEditar}
        onGuardar={handleGuardar}
        onCancelar={() => setProductoAEditar(null)}
        guardando={guardando}
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          Productos cargados <Badge bg="secondary">{productos.length}</Badge>
        </h4>
        {productos.length === 0 && !cargando && (
          <Button variant="outline-primary" size="sm" onClick={handleSembrar} disabled={sembrando}>
            {sembrando ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FaDatabase className="me-1" /> Cargar catálogo de ejemplo
              </>
            )}
          </Button>
        )}
      </div>

      {cargando ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </Spinner>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${Number(producto.precio).toLocaleString("es-AR")}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <BotonEditar onClick={() => handleEditar(producto)}>
                      <FaEdit className="me-1" /> Editar
                    </BotonEditar>
                    <BotonEliminar onClick={() => confirmarEliminar(producto)}>
                      <FaTrash className="me-1" /> Eliminar
                    </BotonEliminar>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    Todavía no hay productos cargados en Firebase.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={!!productoAEliminar} onHide={() => setProductoAEliminar(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que querés eliminar <strong>{productoAEliminar?.nombre}</strong>? Esta acción
          no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProductoAEliminar(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
