# Guía para agentes de IA · web de Asesoría Demo

Esta web la editan sobre todo personas sin perfil técnico. Si eres un asistente de IA que propone cambios,
sigue estas pautas.

## Qué es cada cosa

- `src/contenido/*.md` — páginas (servicios, quiénes somos, contacto…). La URL sale del nombre del fichero.
- `src/contenido/noticias/*.md` — noticias. Cada una con `titulo`, `descripcion` y `date` (AAAA-MM-DD).
- `src/_data/sitio.json` — datos de la empresa (teléfono, correo, dirección). Úsalos con `{{ sitio.telefono }}`, no los copies.
- `src/_data/navegacion.json` — menú principal.
- `src/_includes/` y `src/recursos/estilos.css` — diseño. Solo en ramas `diseno/…`.

## Tono y estilo

- Español de España, trato de **tú**, cercano pero profesional.
- Frases cortas (máximo unas 25 palabras) y párrafos de 2–4 frases.
- Explica los términos fiscales la primera vez que aparecen; nada de jerga innecesaria.
- No prometas resultados («te ahorraremos X €») ni des asesoramiento personalizado en la web.
- Fechas como «4 de noviembre de 2026»; importes como «1.250 €».

## Metadatos obligatorios

- `titulo`: menos de 60 caracteres, sin el nombre de la empresa (la plantilla lo añade).
- `descripcion`: entre 50 y 160 caracteres, única para cada página. Los tests lo comprueban.

## Accesibilidad

- Un único título de nivel 1 por página (lo pone la plantilla a partir de `titulo`); dentro del texto usa `##` y `###` en orden.
- Enlaces con texto que se entienda fuera de contexto: nunca «haz clic aquí».
- Toda imagen lleva **texto alternativo** que describa lo que aporta (`![Equipo reunido en la oficina](/recursos/equipo.svg)`); si es decorativa, no la añadas al contenido.
- No uses el color como única forma de transmitir información.

## Límites

- **No modifiques** `src/contenido/aviso-legal.md` ni `src/contenido/privacidad.md`: son del equipo legal.
- No toques `.github/`, `eleventy.config.js` ni `package.json` en cambios de contenido.
- Enlaces internos con ruta absoluta y barra final (`/servicios/`). Los tests detectan enlaces rotos.

## Comprobación

`npm test` compila la web y verifica títulos, descripciones, enlaces internos, textos alternativos y la estructura básica de accesibilidad.
