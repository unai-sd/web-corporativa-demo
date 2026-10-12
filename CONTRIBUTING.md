# Cómo contribuir a la web de Asesoría Demo

La mayoría de los cambios son de contenido (textos, páginas y noticias) y los hacen personas sin perfil técnico.
Esta guía explica el recorrido de un cambio hasta producción.

## Ramas de entorno

| Rama | Entorno | Quién fusiona |
| --- | --- | --- |
| `main` | Producción (https://www.asesoria-demo.example) | Solo mantenedores, mediante PR de promoción desde `staging` |
| `staging` | Preproducción (https://staging.asesoria-demo.example) | Equipo web, mediante PR revisado |

Nunca se trabaja directamente en `main` ni en `staging`.

## Ramas de trabajo

- **Contenido:** `contenido/<slug>` (p. ej. `contenido/noticia-campana-renta`).
- **Diseño:** `diseno/<slug>` (p. ej. `diseno/cabecera-accesible`). Sin «ñ» ni tildes en los nombres de rama.
- Se crean siempre desde `staging` y el PR se abre **contra `staging`**.

## Recorrido de un cambio

1. Crea la rama desde `staging` y haz tus cambios en `src/contenido/` (Markdown) o `src/_data/`.
2. Abre un PR contra `staging`. La comprobación `verificar` compila la web y pasa los tests
   (títulos, descripciones, enlaces internos y textos alternativos).
3. Tras la revisión, se fusiona con **merge commit** y se publica automáticamente en staging.
4. Periódicamente, un mantenedor abre el **PR de promoción `staging` → `main`**, se comprueba con
   `verificar` y `origen-promocion` y se fusiona con **merge commit** (nunca squash ni rebase, para que
   `staging` y `main` compartan historia). Al fusionarlo se publica en producción y se etiqueta
   `vAAAA.MM.DD`.

## Mensajes de commit

`<tipo>: <resumen en español>`, con tipo `contenido`, `diseno`, `legal` o `mantenimiento`.
Ejemplo: `contenido: noticia sobre la campaña de la renta`.

## Contenido protegido

El **aviso legal** (`src/contenido/aviso-legal.md`) y la **política de privacidad**
(`src/contenido/privacidad.md`) solo los puede cambiar el responsable legal
(`@asesoria-demo/legal` en `CODEOWNERS`). GitHub exige su aprobación en cualquier PR que los toque.
Si detectas un error en esas páginas, avisa al equipo legal en lugar de corregirlo tú.

## Puesta en marcha (solo si trabajas en local)

```sh
npm ci
npm run dev    # http://localhost:8080
npm test       # compila la web y pasa los tests
```
