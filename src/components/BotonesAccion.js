import styled from "styled-components";

// Botones de acción reutilizables (estilización con styled-components,
// Requerimiento #3) usados en el panel de administración de productos.

export const BotonAccion = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  margin-left: 8px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const BotonEditar = styled(BotonAccion)`
  border-color: #ffc107;
  color: #b98900;

  &:hover {
    background-color: #ffc107;
    color: #212529;
  }
`;

export const BotonEliminar = styled(BotonAccion)`
  border-color: #dc3545;
  color: #dc3545;

  &:hover {
    background-color: #dc3545;
    color: #fff;
  }
`;
