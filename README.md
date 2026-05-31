# tellmeoz.dev 🚀

Personal Portfolio and Cloud Solutions Design Showcase for **Osvaldo Ortega Martinez**.

*Read this in [Español](#español) or [English](#english).*

---

## Español

Este es el repositorio de mi sitio web personal y portafolio profesional, diseñado desde cero para demostrar mis capacidades en desarrollo frontend moderno y arquitectura serverless.

### 🛠️ Características Técnicas
*   **Pure Vanilla Stack:** Construido utilizando únicamente HTML5, CSS3 y JavaScript nativo, eliminando frameworks pesados para garantizar una carga instantánea y excelente rendimiento SEO.
*   **Sistema de Diseño Moderno (CSS Layers):** Estructurado con capas de cascada (`@layer`) para una especificidad de CSS predecible y limpia.
*   **Tema Claro/Oscuro Adaptivo:** Variables CSS dinámicas mapeadas en espacio de color `oklch` mediante la función nativa `light-dark()`.
*   **Soporte Bilingüe Nativo (ES/EN):** Control multilingüe gestionado de forma nativa en el DOM mediante selectores CSS condicionales (`html[lang="..."]`).
*   **Micro-animaciones Interactivas:** Efecto dinámico en el que orbes luminosos siguen sutilmente el movimiento del cursor en el fondo.
*   **Formulario de Contacto Serverless:** Lógica del lado del servidor alojada en una **Vercel Serverless Function** (`api/send.js`), que procesa las solicitudes y las despacha usando la API de **Resend**.

### 📁 Estructura del Proyecto
```
oz.dev/
├── api/
│   └── send.js          # Endpoint serverless para el envío de correos
├── index.html           # Estructura del sitio (Bilingüe)
├── index.css            # Hoja de estilos (Capas CSS, oklch, glassmorphism)
├── script.js            # Lógica interactiva (Theme toggler, Lang toggler, Form Fetch)
└── .gitignore           # Archivos ignorados por Git
```

### 💻 Desarrollo Local
Puedes abrir el archivo `index.html` directamente en tu navegador. Para probar la función serverless localmente, se recomienda utilizar la CLI de Vercel:
```sh
# Instalar Vercel CLI globalmente si no lo tienes
npm install -g vercel

# Ejecutar el entorno de desarrollo local (emula funciones serverless)
vercel dev
```

### ☁️ Despliegue e Infraestructura
Este sitio está diseñado para funcionar con la siguiente infraestructura sin costo de hosting:
1.  **Hosting & Serverless:** Desplegado en [Vercel](https://vercel.com/) como proyecto estático + serverless.
2.  **DNS & Registro:** Gestionado en [Cloudflare](https://www.cloudflare.com/) a precio de costo.
3.  **Recepción de Correo:** Redirección de `hi@tellmeoz.dev` a Gmail a través de **Cloudflare Email Routing**.
4.  **Envío de Correo:** Envío como `hi@tellmeoz.dev` usando la API/SMTP gratuita de **Resend**.

*Nota: Asegúrate de configurar la variable de entorno `RESEND_API_KEY` en la consola de Vercel para habilitar el formulario.*

---

## English

This is the repository for my personal website and professional portfolio, built from scratch to showcase modern frontend techniques and serverless capabilities.

### 🛠️ Technical Features
*   **Pure Vanilla Stack:** Built using only native HTML5, CSS3, and JavaScript, eliminating heavy frameworks to guarantee instant loads and optimal SEO.
*   **Modern CSS Architecture (CSS Layers):** Organized with cascade layers (`@layer`) for clean, predictable specificity.
*   **Adaptive Light/Dark Theme:** Dynamic CSS variables mapped in the `oklch` color space using the native `light-dark()` function.
*   **Native Bilingual Support (ES/EN):** Multi-language controls managed natively in the DOM using conditional CSS selectors (`html[lang="..."]`).
*   **Interactive Micro-animations:** Dynamic visual effects where glow background orbs subtly track mouse coordinates.
*   **Serverless Contact Form:** Backend logic hosted as a **Vercel Serverless Function** (`api/send.js`), processing and dispatching messages via the **Resend** API.

### 📁 Project Structure
```
oz.dev/
├── api/
│   └── send.js          # Serverless mail delivery endpoint
├── index.html           # Document structure (Bilingual)
├── index.css            # Stylesheet (CSS Layers, oklch, glassmorphism)
├── script.js            # Client-side logic (Theme, Lang toggles, Form Fetch)
└── .gitignore           # Git ignore configurations
```

### 💻 Local Development
You can open `index.html` directly in any web browser. To test the serverless function locally, Vercel CLI is recommended:
```sh
# Install Vercel CLI globally if needed
npm install -g vercel

# Run the local development environment (emulates serverless functions)
vercel dev
```

### ☁️ Deployment & Infrastructure
This website is optimized to run on the following infrastructure with zero hosting costs:
1.  **Hosting & Serverless:** Deployed on [Vercel](https://vercel.com/) (Static + Serverless).
2.  **DNS & Registrar:** Managed on [Cloudflare](https://www.cloudflare.com/) at wholesale cost.
3.  **Inbound Email:** Redirection from `hi@tellmeoz.dev` to Gmail via **Cloudflare Email Routing**.
4.  **Outbound Email:** Send mail as `hi@tellmeoz.dev` using the free SMTP/API tier of **Resend**.

*Note: Make sure to set the `RESEND_API_KEY` environment variable in your Vercel project dashboard to enable the contact form.*
