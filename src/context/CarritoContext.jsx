import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext();

const STORAGE_KEY = "mi-tienda-carrito";

function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  // Agrega un producto al carrito. Si ya existe, suma la cantidad.
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const getCantidadPorId = (id) => {
    const item = carrito.find((item) => item.id === id);
    return item ? item.cantidad : 0;
  };

  const getCantidadTotal = () =>
    carrito.reduce((total, item) => total + item.cantidad, 0);

  const getTotal = () =>
    carrito.reduce((total, item) => total + item.cantidad * item.precio, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        getCantidadPorId,
        getCantidadTotal,
        getTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
}
