# Panel de Control - Catálogo Ilumina

Este proyecto es el panel administrativo para gestionar los productos del catálogo de cosméticos.

## Características

- **Autenticación**: Login simple (admin / 123).
- **Gestión de Productos**:
  - Listar productos.
  - Crear productos (con subida de imagen a Cloudinary).
  - Editar productos.
  - Eliminar productos.
- **Diseño**: Interfaz moderna y responsiveness utilizando Tailwind CSS.

## Tecnologías

- Next.js 16
- MongoDB (Mongoose)
- Cloudinary (Almacenamiento de imágenes)
- Tailwind CSS
- Lucide React (Iconos)

## Configuración

1.  **Variables de Entorno**: Asegúrate de tener el archivo `.env` en la raíz con:

    ```env
    MONGODB_URI="..."
    CLOUDINARY_CLOUD_NAME="..."
    CLOUDINARY_API_KEY="..."
    CLOUDINARY_API_SECRET="..."
    CLOUDINARY_FOLDER="catalogo-ilumina"
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```

## Estructura

- `app/login`: Página de inicio de sesión.
- `app/admin`: Rutas protegidas del panel.
- `lib/db.ts`: Conexión a base de datos.
- `lib/cloudinary.ts`: Configuración de subida de archivos.
- `models/Product.ts`: Modelo de datos (schema).
