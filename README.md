# E-Commerce de Personajes y Planetas de Dragon Ball

Esta aplicación es un e-commerce que permite a los usuarios explorar y comprar personajes y planetas del universo de Dragon Ball. Los datos se obtienen de la API pública [Dragon Ball API](https://web.dragonball-api.com/).

## Funcionalidades principales

### 1. **Inicio de sesión**
- Los usuarios deben iniciar sesión para acceder a las funcionalidades de la aplicación.
- Credenciales predeterminadas:
  - Usuario: `admin`
  - Contraseña: `1234`

### 2. **Explorar personajes**
- Los usuarios pueden buscar y explorar personajes del universo de Dragon Ball.
- Cada personaje tiene detalles como nombre, raza, género, ki, afiliación, planeta de origen, transformaciones y precio ficticio.
- Los personajes pueden ser agregados al carrito de compras.

### 3. **Explorar planetas**
- Los usuarios pueden explorar planetas del universo de Dragon Ball.
- Cada planeta tiene detalles como nombre, descripción, estado (destruido o no), imagen y precio ficticio.
- Los planetas pueden ser agregados al carrito de compras.

### 4. **Carrito de compras**
- Los usuarios pueden ver los personajes y planetas agregados al carrito.
- Se muestra el precio total basado en la cantidad de cada elemento.
- Los usuarios pueden eliminar elementos del carrito o vaciarlo completamente.

### 5. **Detalles de personajes**
- Los usuarios pueden ver información detallada de cada personaje, incluyendo sus transformaciones.

### 6. **Autenticación**
- La aplicación verifica si el usuario está autenticado antes de permitir el acceso a las páginas principales.
- Si el usuario no está autenticado, se muestra un mensaje de error con una imagen temática de Dragon Ball.



## Estructura del proyecto

- **`src/components`**: Contiene componentes reutilizables como tarjetas de personajes, transformaciones y listas.
- **`src/pages`**: Contiene las páginas principales como personajes, planetas, carrito y login.
- **`src/hooks`**: Contiene hooks personalizados para manejar datos de personajes y planetas.
- **`src/services`**: Contiene funciones para interactuar con la API de Dragon Ball.
- **`src/assets`**: Contiene imágenes utilizadas en la aplicación.

