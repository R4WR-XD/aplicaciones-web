# Vivero — Frontend

E-commerce de plantas. Proyecto universitario. Permite explorar productos, agregarlos al carrito y completar una compra via MercadoPago.

**Web:** https://aplicaciones-web-gules.vercel.app

**Repositorio del backend:** https://github.com/SorrowOfSpira/aplicacionesWeb

---

## Tecnologías

- React 19 + TypeScript + Vite
- React Router v7
- Axios
- MercadoPago SDK

---

## Funcionalidades

- Listado de productos con filtrado por categorías y paginación
- Detalle de producto
- Carrito persistente por usuario (localStorage)
- Drawer de carrito con feedback al agregar ítems
- Registro e inicio de sesión con JWT
- Checkout que genera preferencia de MercadoPago y redirige al pago
- Páginas de resultado: éxito y fallo.

---

## Usuarios de prueba

### App

| Campo | Valor |
|-------|-------|
| Email | `test@test.com` |
| Contraseña | `testtest` |

Usar para iniciar sesión y probar el carrito de compras.

### MercadoPago (comprador de prueba)

| Campo | Valor |
|-------|-------|
| Usuario | `TESTUSER2539648852025282151` |
| Contraseña | `EOUOBFINmZ` |
| Código de verificación | `612367` |
| País | Argentina |

Usar estos datos en el checkout de MercadoPago para simular una compra.

