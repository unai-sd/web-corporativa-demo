import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { atributos, paginasGeneradas } from './utilidades.js';

const paginas = paginasGeneradas();

describe('páginas generadas', () => {
  it('genera las páginas principales', () => {
    const rutas = paginas.map((p) => p.ruta);
    for (const esperada of [
      'index.html',
      'quienes-somos/index.html',
      'contacto/index.html',
      'noticias/index.html',
      'aviso-legal/index.html',
      'privacidad/index.html',
    ]) {
      assert.ok(rutas.includes(esperada), `falta ${esperada}`);
    }
  });

  for (const { ruta, html } of paginas) {
    describe(ruta, () => {
      it('está en español', () => {
        assert.match(html, /<html lang="es">/);
      });

      it('tiene un título', () => {
        const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
        assert.ok(titulo, 'sin <title>');
        assert.ok(titulo.endsWith('Asesoría Demo'), `título sin el nombre del sitio: ${titulo}`);
      });

      it('tiene una meta descripción de 50 a 160 caracteres', () => {
        const descripcion = html.match(/<meta name="description" content="([^"]*)">/)?.[1];
        assert.ok(descripcion, 'sin meta descripción');
        const longitud = [...descripcion].length;
        assert.ok(longitud >= 50 && longitud <= 160, `longitud ${longitud}: ${descripcion}`);
      });

      it('tiene un único h1', () => {
        assert.equal(html.match(/<h1\b/g)?.length, 1);
      });

      it('todas las imágenes tienen texto alternativo', () => {
        const imagenes = html.match(/<img\b[^>]*>/g) ?? [];
        for (const img of imagenes) {
          assert.match(img, /\salt="[^"]+"/, `imagen sin alt: ${img}`);
        }
      });
    });
  }

  it('los títulos no se repiten', () => {
    const titulos = paginas.map((p) => p.html.match(/<title>([^<]*)<\/title>/)?.[1]);
    assert.equal(new Set(titulos).size, titulos.length);
  });
});
