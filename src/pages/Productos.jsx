import { Helmet } from 'react-helmet-async';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';

function Productos() {
  return (
    <>
      <Helmet>
        <title>Mi Tienda | Productos</title>
        <meta
          name="description"
          content="Catálogo completo de productos de tecnología: buscá, filtrá por categoría y agregá al carrito."
        />
      </Helmet>
      <ItemListContainer greeting="Bienvenido a nuestra tienda" />
    </>
  );
}

export default Productos;
