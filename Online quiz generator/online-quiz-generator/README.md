# Generador de Cuestionarios Online

Una aplicación web interactiva que permite crear, administrar y responder cuestionarios de forma dinámica.

## Características

- **Interfaz intuitiva**: Diseño limpio y fácil de usar para creadores y usuarios.
- **Soporte multilingüe**: Interfaz disponible en varios idiomas.
- **Modos de usuario**:
  - **Modo anónimo**: Permite a los usuarios responder cuestionarios sin necesidad de registrarse.
  - **Modo usuario**: Funcionalidades adicionales para usuarios registrados.
  - **Modo administrador**: Herramientas para crear y gestionar cuestionarios.
- **Sistema de autenticación**: Login seguro con diferentes niveles de acceso.

## Estructura de la Aplicación

- **Página principal** (`index.html`): Punto de entrada con opciones para iniciar como anónimo o iniciar sesión.
- **Panel de administración** (`admin.html`): Interfaz para crear y gestionar cuestionarios.
- **Interfaz de usuario** (`user.html`): Experiencia personalizada para usuarios registrados.

## Tecnologías Utilizadas

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Gestión de datos**:
  - Almacenamiento local del navegador
  - Sistema de gestión de datos mediante JavaScript

## Cómo Usar

### Para Usuarios

1. Abra `index.html` en su navegador
2. Elija entre:
   - "Iniciar como Anónimo" para acceder directamente a los cuestionarios
   - "Iniciar Sesión" para acceder con su cuenta

### Para Administradores

1. Abra `index.html` en su navegador
2. Haga clic en "Iniciar Sesión"
3. Ingrese las credenciales de administrador:
   - Usuario: "admin"
   - Contraseña: "admin123"
4. Acceda al panel de administración para crear y gestionar cuestionarios

## Notas de Desarrollo

Esta aplicación está diseñada como una demostración funcional y utiliza almacenamiento local del navegador para persistir datos. En un entorno de producción, se recomendaría implementar un backend con una base de datos adecuada.