// Catálogo base utilizado para poblar la colección "productos" de Firestore
// la primera vez que se usa el Panel de Administración (ver src/pages/Admin.jsx).
const productosSeed = [
  {
    nombre: "iPhone 15 Pro",
    precio: 1199.99,
    categoria: "Smartphones",
    descripcion:
      "El iPhone más avanzado con chip A17 Pro, sistema de cámaras profesional de 48MP y pantalla Super Retina XDR de 6.1 pulgadas.",
    imagen:
      "https://images.unsplash.com/photo-1696446701796-da61339df88c?w=400&h=300&fit=crop",
    stock: 15,
    rating: 4.8,
  },
  {
    nombre: "MacBook Air M2",
    precio: 1299.99,
    categoria: "Laptops",
    descripcion:
      "Ultrafino y potente. El chip M2 ofrece un rendimiento increíble con hasta 18 horas de batería y pantalla Liquid Retina de 13.6 pulgadas.",
    imagen:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    stock: 8,
    rating: 4.9,
  },
  {
    nombre: "AirPods Pro 2",
    precio: 249.99,
    categoria: "Audio",
    descripcion:
      "Cancelación de ruido adaptativa, audio espacial personalizado y hasta 30 horas de batería con el estuche de carga.",
    imagen:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
    stock: 30,
    rating: 4.7,
  },
  {
    nombre: "Samsung Galaxy S24 Ultra",
    precio: 1399.99,
    categoria: "Smartphones",
    descripcion:
      "El máximo de Samsung con S Pen integrado, cámara de 200MP, pantalla Dynamic AMOLED 2X de 6.8 pulgadas y 12GB de RAM.",
    imagen:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    stock: 12,
    rating: 4.6,
  },
  {
    nombre: "iPad Pro M4",
    precio: 999.99,
    categoria: "Tablets",
    descripcion:
      "La tablet más potente del mercado. Chip M4, pantalla OLED Ultra Retina XDR de 11 pulgadas y diseño ultra delgado de 5.1mm.",
    imagen:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    stock: 20,
    rating: 4.8,
  },
  {
    nombre: "Sony WH-1000XM5",
    precio: 349.99,
    categoria: "Audio",
    descripcion:
      "Los mejores auriculares con cancelación de ruido del mercado. 30 horas de batería, audio de alta resolución y diseño plegable.",
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    stock: 25,
    rating: 4.7,
  },
  {
    nombre: "Dell XPS 15",
    precio: 1799.99,
    categoria: "Laptops",
    descripcion:
      "Laptop premium con pantalla OLED 4K de 15.6 pulgadas, Intel Core i9, NVIDIA RTX 4070 y 32GB de RAM. Ideal para creativos.",
    imagen:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
    stock: 5,
    rating: 4.5,
  },
  {
    nombre: "Apple Watch Series 9",
    precio: 399.99,
    categoria: "Wearables",
    descripcion:
      "Smartwatch más inteligente con chip S9, pantalla siempre activa, detección de accidentes y hasta 18 horas de batería.",
    imagen:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
    stock: 18,
    rating: 4.6,
  },
  {
    nombre: "Logitech MX Master 3S",
    precio: 99.99,
    categoria: "Accesorios",
    descripcion:
      "Mouse inalámbrico de alta precisión con scroll silencioso, conexión multi-dispositivo y batería de larga duración.",
    imagen:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop",
    stock: 22,
    rating: 4.7,
  },
  {
    nombre: 'Samsung Odyssey G7 27"',
    precio: 549.99,
    categoria: "Monitores",
    descripcion:
      "Monitor gamer curvo QHD de 240Hz, 1ms de respuesta y panel QLED con colores vibrantes.",
    imagen:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    stock: 10,
    rating: 4.5,
  },
  {
    nombre: "Nintendo Switch OLED",
    precio: 349.99,
    categoria: "Gaming",
    descripcion:
      "Consola híbrida con pantalla OLED de 7 pulgadas, mayor almacenamiento y base con puerto LAN integrado.",
    imagen:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
    stock: 14,
    rating: 4.8,
  },
  {
    nombre: "GoPro HERO12 Black",
    precio: 399.99,
    categoria: "Cámaras",
    descripcion:
      "Cámara de acción con estabilización HyperSmooth 6.0, video 5.3K y resistencia al agua sin carcasa.",
    imagen:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
    stock: 9,
    rating: 4.6,
  },
];

export default productosSeed;
