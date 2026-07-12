import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

// Envuelve rutas que sólo deben ser accesibles para usuarios autenticados
// (ej: /admin). Si todavía no se resolvió el estado de sesión, muestra un
// spinner; si no hay usuario logueado, redirige a /login.
function ProtectedRoute({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </Spinner>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
