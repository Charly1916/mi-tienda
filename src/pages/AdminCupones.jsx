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
import { FaEdit, FaTag, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import FormularioCupon from "../components/FormularioCupon/FormularioCupon";
import { BotonEditar, BotonEliminar } from "../components/BotonesAccion";

const COLECCION = "cupones";

function AdminCupones() {
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [cuponAEditar, setCuponAEditar] = useState(null);
  const [cuponAEliminar, setCuponAEliminar] = useState(null);

  const obtenerCupones = async () => {
    setCargando(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, COLECCION));
      const lista = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
      setCupones(lista);
    } catch (err) {
      console.error("Error al obtener los cupones:", err);
      setError("No se pudieron cargar los cupones desde Firebase.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const handleGuardar = async (datosCupon) => {
    setGuardando(true);
    setError("");
    try {
      if (cuponAEditar) {
        await updateDoc(doc(db, COLECCION, cuponAEditar.id), datosCupon);
      } else {
        await addDoc(collection(db, COLECCION), datosCupon);
      }
      setCuponAEditar(null);
      await obtenerCupones();
    } catch (err) {
      console.error("Error al guardar el cupón:", err);
      setError("Ocurrió un error al guardar el cupón. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = (cupon) => {
    setCuponAEditar(cupon);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmarEliminar = (cupon) => setCuponAEliminar(cupon);

  const handleEliminar = async () => {
    if (!cuponAEliminar) return;
    setError("");
    try {
      await deleteDoc(doc(db, COLECCION, cuponAEliminar.id));
      setCupones((prev) => prev.filter((c) => c.id !== cuponAEliminar.id));
      if (cuponAEditar?.id === cuponAEliminar.id) {
        setCuponAEditar(null);
      }
    } catch (err) {
      console.error("Error al eliminar el cupón:", err);
      setError("No se pudo eliminar el cupón.");
    } finally {
      setCuponAEliminar(null);
    }
  };

  return (
    <Container className="py-4">
      <Helmet>
        <title>Mi Tienda | Gestión de cupones</title>
        <meta name="description" content="Administración de cupones de descuento." />
      </Helmet>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="mb-0">
          <FaTag className="me-2" />
          Gestión de cupones
        </h1>
        <Link to="/admin" className="btn btn-outline-secondary btn-sm">
          ← Volver a productos
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <FormularioCupon
        cuponAEditar={cuponAEditar}
        onGuardar={handleGuardar}
        onCancelar={() => setCuponAEditar(null)}
        guardando={guardando}
      />

      <h4 className="mb-3">
        Cupones cargados <Badge bg="secondary">{cupones.length}</Badge>
      </h4>

      {cargando ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando cupones...</span>
          </Spinner>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descuento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cupones.map((cupon) => (
                <tr key={cupon.id}>
                  <td>{cupon.codigo}</td>
                  <td>{cupon.descuento}%</td>
                  <td>
                    <BotonEditar onClick={() => handleEditar(cupon)}>
                      <FaEdit className="me-1" /> Editar
                    </BotonEditar>
                    <BotonEliminar onClick={() => confirmarEliminar(cupon)}>
                      <FaTrash className="me-1" /> Eliminar
                    </BotonEliminar>
                  </td>
                </tr>
              ))}
              {cupones.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-4">
                    Todavía no hay cupones cargados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={!!cuponAEliminar} onHide={() => setCuponAEliminar(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que querés eliminar el cupón <strong>{cuponAEliminar?.codigo}</strong>? Esta
          acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCuponAEliminar(null)}>
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

export default AdminCupones;
