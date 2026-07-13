import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaSave, FaTimes } from "react-icons/fa";

const estadoInicial = {
  codigo: "",
  descuento: "",
};

// Formulario controlado para alta y edición de cupones. Sigue el mismo
// patrón que FormularioProducto: si recibe `cuponAEditar` se puebla con esos
// datos y pasa a "modo edición".
function FormularioCupon({ cuponAEditar, onGuardar, onCancelar, guardando }) {
  const [datos, setDatos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (cuponAEditar) {
      setDatos({
        codigo: cuponAEditar.codigo ?? "",
        descuento: cuponAEditar.descuento ?? "",
      });
    } else {
      setDatos(estadoInicial);
    }
    setErrores({});
  }, [cuponAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.codigo.trim()) nuevosErrores.codigo = "El código es obligatorio.";
    const porcentaje = Number(datos.descuento);
    if (datos.descuento === "" || porcentaje < 1 || porcentaje > 100) {
      nuevosErrores.descuento = "El descuento debe estar entre 1 y 100.";
    }
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
      codigo: datos.codigo.trim().toUpperCase(),
      descuento: Number(datos.descuento),
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate className="p-4 border rounded shadow-sm mb-4 bg-white">
      <h4 className="mb-3">{cuponAEditar ? "Editar cupón" : "Crear cupón"}</h4>

      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="cuponCodigo">
            <Form.Label>Código *</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={datos.codigo}
              onChange={handleChange}
              isInvalid={!!errores.codigo}
              placeholder="Ej: VERANO10"
              style={{ textTransform: "uppercase" }}
            />
            <Form.Control.Feedback type="invalid">{errores.codigo}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="cuponDescuento">
            <Form.Label>Descuento (%) *</Form.Label>
            <Form.Control
              type="number"
              name="descuento"
              min="1"
              max="100"
              value={datos.descuento}
              onChange={handleChange}
              isInvalid={!!errores.descuento}
              placeholder="Ej: 10"
            />
            <Form.Control.Feedback type="invalid">{errores.descuento}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2">
        <Button type="submit" variant={cuponAEditar ? "warning" : "primary"} disabled={guardando}>
          {guardando ? (
            <Spinner animation="border" size="sm" />
          ) : cuponAEditar ? (
            <>
              <FaSave className="me-1" /> Actualizar cupón
            </>
          ) : (
            <>
              <FaPlusCircle className="me-1" /> Crear cupón
            </>
          )}
        </Button>

        {cuponAEditar && (
          <Button type="button" variant="outline-secondary" onClick={onCancelar}>
            <FaTimes className="me-1" /> Cancelar
          </Button>
        )}
      </div>
    </Form>
  );
}

export default FormularioCupon;
