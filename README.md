# Mi portfolio template Aurora

> by Aurora

Puedes ver mi portfolio aquí:[Portfolio Aurora](https://amgm57-brosqui.github.io/portfolio-template-aurora/)

## Descripción del proyecto

**Portfolio Template — Aurora** es una plantilla de portfolio profesional creada como proyecto final del brief de _Web Atelier (UDIT)_. El objetivo es construir una web sólida y reutilizable que muestre una identidad visual cuidada, una estructura clara de secciones (home, proyectos, about, contacto, etc.), diseño responsive y detalles de interacción propios de una plantilla “lista para enseñar”.

El proyecto está enfocado en:

- **Maquetación moderna** (Grid/Flex) y responsive.
- **Interacciones y animaciones** (especialmente en scroll) para enriquecer la experiencia.
- **Efectos visuales** como **glassmorphism** y microinteracciones.
- **Buenas prácticas**: estructura de archivos, despliegue y documentación.

## Funcionalidades y efectos destacados

- **Glassmorphism** (cabecera con blur + transparencia).
- **Animaciones de entrada en el Hero** (GSAP).
- **Reveals al hacer scroll** (ScrollTrigger) para secciones y elementos.
- **Parallax suave** en el collage/elementos visuales durante el scroll.
- **Indicador de progreso de scroll** (barra/progreso de lectura).
- **Cursor personalizado “pro”** (dot + blob con suavizado y efecto squash).
- **Botones magnéticos** (microinteracción al acercar el cursor).
- **Efecto tilt** (inclinación ligera sin librería externa).
- **Menú móvil robusto** con overlay.
- **Cambio de idioma ES/EN** (toggle).
- **Bootstrap Carousel** inicializado para sliders.
- **Formulario demo** (no envía, pensado como plantilla).
- **Video safety**: pausa automática si el contenido queda oculto.
- **Back to top** en footer.

## Tecnologías y herramientas utilizadas

### Frontend

- **HTML5** (estructura semántica)
- **CSS3**
  - Layouts con **CSS Grid** y **Flexbox**
  - Responsive (clamp, escalado fluido, etc.)
  - Glassmorphism (backdrop-filter)
- **JavaScript (Vanilla)** para la lógica e interactividad

### Librerías / recursos externos (CDN)

- **GSAP 3** + **ScrollTrigger** (animaciones y triggers en scroll)
- **Bootstrap 5** (componentes y utilidades, incluyendo carousel)
- **Font Awesome** (iconos)
- **Fontshare** (tipografía: _Clash Display_)

## Accesibilidad

- Uso de **HTML semántico** (`header`, `nav`, `main`, `section`, `footer`) para mejorar la comprensión por lectores de pantalla.
- **Jerarquía correcta de encabezados** (`h1` → `h2` → `h3`) sin saltos innecesarios.
- **Contrastes de color** cuidados para asegurar la legibilidad del texto sobre fondos sólidos y con efecto _glassmorphism_.
- **Tipografía legible** y escalable mediante unidades relativas (`rem`, `clamp()`).
- **Navegación accesible por teclado** en los elementos interactivos principales (links, botones, menú).
- **Estados `:hover` y `:focus` visibles** para facilitar la interacción sin ratón.
- **Imágenes con atributo `alt`** descriptivo cuando aportan información.
- **Animaciones no intrusivas**, pensadas para no interferir con la lectura del contenido.
- Organización clara del contenido para facilitar la orientación y comprensión de la página.

> Las animaciones y efectos visuales (scroll, parallax, glassmorphism) se han diseñado priorizando la experiencia de usuario y sin bloquear el acceso al contenido principal.

## Estructura del proyecto

portfolio-template-aurora/
├── index.html
├── 404.html
├── README.md
├── LICENSE
├── .gitignore
├── docs/
│ └── plan.md
└── assets/
├── css/
│ ├── base.css
│ ├── layout.css
│ ├── components.css
│ ├── otros.css
│ └── index.css
└── js/
└── main.js
