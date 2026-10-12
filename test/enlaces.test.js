import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';
import { atributos, ficheroDeUrl, paginasGeneradas } from './utilidades.js';

const paginas = paginasGeneradas();

describe('enlaces internos', () => {
  for (const { ruta, html } of paginas) {
    it(`${ruta} no tiene enlaces internos rotos`, () => {
      const urls = [
        ...atributos(html, 'a', 'href'),
        ...atributos(html, 'link', 'href'),
        ...atributos(html, 'img', 'src'),
      ].filter((url) => url.startsWith('/') && !url.startsWith('//'));
      const rotos = urls.filter((url) => !existsSync(ficheroDeUrl(url)));
      assert.deepEqual(rotos, []);
    });

    it(`${ruta} tiene destino para cada ancla`, () => {
      for (const href of atributos(html, 'a', 'href').filter((h) => h.startsWith('#'))) {
        assert.ok(html.includes(`id="${href.slice(1)}"`), `ancla sin destino: ${href}`);
      }
    });
  }
});
