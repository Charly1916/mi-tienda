import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("No se pudo iniciar sesión. Revisá el email y la contraseña.");
      console.error("Error en el login:", err.code, err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Mi Tienda | Iniciar sesión</title>
        <meta name="description" content="Iniciá sesión en Mi Tienda para gestionar tu cuenta." />
      </Helmet>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-center">
                <FaSignInAlt className="me-2" />
                Iniciar sesión
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100" disabled={enviando}>
                  {enviando ? <Spinner animation="border" size="sm" /> : "Ingresar"}
                </Button>
              </Form>

              <p className="text-center mt-3 mb-0">
                ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
