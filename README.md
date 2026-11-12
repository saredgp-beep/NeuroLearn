# NeuroLearn — prototipo web

Plataforma educativa demostrativa desarrollada con **HTML, CSS y JavaScript puro**. No utiliza Python, React ni Node.js.

## Estructura

- `index.html`: portada institucional con resumen, misión, visión y valores.
- `pages/acceso.html`: selección de perfil.
- `pages/estudiante.html`: materias, evaluaciones, historial y cursos asignados.
- `pages/docente.html`: resultados, análisis de errores, catálogo y asignación manual de cursos.
- `css/styles.css`: estilos responsive.
- `js/data.js`: banco inicial de 60 preguntas y catálogo de cursos.
- `js/app.js`: lógica de evaluaciones, seguimiento y ventanas modales accesibles.
- `assets/img/logo-neurolearn.jpeg`: logotipo original proporcionado para NeuroLearn.

## Cómo ejecutar

Abre `index.html` en un navegador moderno. También puedes publicar la carpeta en GitHub Pages. No requiere instalación ni compilación.

## Comportamiento actual

- Dos materias: Administración y Contabilidad.
- Tres niveles: Básico, Intermedio y Avanzado.
- Cada evaluación tiene 10 preguntas.
- Se aprueba con 8 respuestas correctas (80%). Aprobar desbloquea el siguiente nivel, pero no lo inicia automáticamente.
- El alumno puede revisar sus temas por reforzar y el historial.
- El docente consulta resultados y asigna cursos manualmente.
- Las evaluaciones, sus resultados, el análisis docente y las confirmaciones de asignación se muestran en ventanas modales reales; se cierran con el botón, al pulsar fuera o con Escape.
- Los datos se guardan en `localStorage` del navegador. Para compartir resultados entre equipos se requiere backend y base de datos.

## Consideraciones

Este paquete es un prototipo funcional, no un sistema con autenticación ni IA externa conectada. El banco de preguntas y las recomendaciones por tema son contenido demostrativo inicial que debe revisarse y ampliarse con material académico validado. La selección sugerida de cursos es orientativa; el docente conserva la decisión de asignación.

El logotipo institucional original proporcionado está integrado en la portada y en los encabezados de las páginas internas.

## Siguiente etapa técnica

Implementar API con Java y persistencia PostgreSQL, autenticación y perfiles reales. GitHub Pages puede alojar el frontend estático; el backend Java y PostgreSQL deberán desplegarse en un servicio independiente.
