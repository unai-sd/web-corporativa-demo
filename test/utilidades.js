import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

export const SALIDA = path.resolve(import.meta.dirname, '..', '_site');

/** Devuelve todas las páginas HTML generadas como { ruta, html }. */
export function paginasGeneradas() {
  if (!existsSync(SALIDA)) {
    throw new Error('No existe _site: ejecuta "npm run build" antes de los tests.');
  }
  const paginas = [];
  const recorrer = (dir) => {
    for (const nombre of readdirSync(dir)) {
      const completo = path.join(dir, nombre);
      if (statSync(completo).isDirectory()) recorrer(completo);
      else if (nombre.endsWith('.html')) {
        paginas.push({ ruta: path.relative(SALIDA, completo), html: readFileSync(completo, 'utf8') });
      }
    }
  };
  recorrer(SALIDA);
  return paginas;
}

export function atributos(html, etiqueta, atributo) {
  const patron = new RegExp(`<${etiqueta}\\b[^>]*\\s${atributo}="([^"]*)"`, 'gi');
  return [...html.matchAll(patron)].map((m) => m[1]);
}

/** Convierte una URL interna en el fichero de _site que debería existir. */
export function ficheroDeUrl(url) {
  const limpia = decodeURI(url.split('#')[0].split('?')[0]);
  const relativa = limpia.endsWith('/') ? `${limpia}index.html` : limpia;
  return path.join(SALIDA, relativa);
}
