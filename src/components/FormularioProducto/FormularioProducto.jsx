import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaSave, FaTimes } from "react-icons/fa";

const estadoInicial = {
  nombre: "",
  precio: "",
  categoria: "",
  descripcion: "",
  imagen: "",
  stock: "",
  rating: "",
};

// Formulario controlado para alta y edición de productos (Requerimiento #2).
// Si recibe `productoAEditar`, se puebla con esos datos y pasa a "modo edición".
function FormularioProducto({ productoAEditar, onGuardar, onCancelar, guardando }) {
  const [datos, setDatos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoAEditar) {
      setDatos({
        nombre: productoAEditar.nombre ?? "",
        precio: productoAEditar.precio ?? "",
        categoria: productoAEditar.categoria ?? "",
        descripcion: productoAEditar.descripcion ?? "",
        imagen: productoAEditar.imagen ?? "",
        stock: productoAEditar.stock ?? "",
        rating: productoAEditar.rating ?? "",
      });
    } else {
      setDatos(estadoInicial);
    }
    setErrores({});
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (datos.precio === "" || Number(datos.precio) <= 0)
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    if (!datos.categoria.trim()) nuevosErrores.categoria = "La categoría es obligatoria.";
    if (!datos.imagen.trim()) nuevosErrores.imagen = "La URL de imagen es obligatoria.";
    if (datos.stock === "" || Number(datos.stock) < 0)
      nuevosErrores.stock = "El stock no puede ser negativo.";
    if (datos.rating !== "" && (Number(datos.rating) < 0 || Number(datos.rating) > 5))
      nuevosErrores.rating = "El rating debe estar entre 0 y 5.";
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onGuardar({
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      rating: datos.rating === "" ? 0 : Number(datos.rating),
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate className="p-4 border rounded shadow-sm mb-4 bg-white">
      <h4 className="mb-3">
        {productoAEditar ? "Editar producto" : "Agregar producto"}
      </h4>

      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              isInvalid={!!errores.nombre}
              placeholder="Ej: iPhone 15 Pro"
            />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>Categoría *</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              value={datos.categoria}
              onChange={handleChange}
              isInvalid={!!errores.categoria}
              placeholder="Ej: Smartphones"
            />
            <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="formPrecio">
            <Form.Label>Precio (USD) *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio"
              value={datos.precio}
              onChange={handleChange}
              isInvalid={!!errores.precio}
              placeholder="0.00"
            />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock *</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={datos.stock}
              onChange={handleChange}
              isInvalid={!!errores.stock}
              placeholder="0"
            />
            <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Rating (0-5)</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              name="rating"
              value={datos.rating}
              onChange={handleChange}
              isInvalid={!!errores.rating}
              placeholder="4.5"
            />
            <Form.Control.Feedback type="invalid">{errores.rating}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>URL de imagen *</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={datos.imagen}
              onChange={handleChange}
              isInvalid={!!errores.imagen}
              placeholder="https://..."
            />
            <Form.Control.Feedback type="invalid">{errores.imagen}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={datos.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2">
        <Button type="submit" variant={productoAEditar ? "warning" : "primary"} disabled={guardando}>
          {guardando ? (
            <Spinner animation="border" size="sm" />
          ) : productoAEditar ? (
            <>
              <FaSave className="me-1" /> Guardar cambios
            </>
          ) : (
            <>
              <FaPlusCircle className="me-1" /> Agregar producto
            </>
          )}
        </Button>

        {productoAEditar && (
          <Button type="button" variant="outline-secondary" onClick={onCancelar}>
            <FaTimes className="me-1" /> Cancelar
          </Button>
        )}
      </div>
    </Form>
  );
}

export default FormularioProducto;
