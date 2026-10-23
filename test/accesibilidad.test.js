import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { paginasGeneradas } from './utilidades.js';

describe('accesibilidad básica', () => {
  for (const { ruta, html } of paginasGeneradas()) {
    it(`${ruta} empieza con un enlace para saltar al contenido`, () => {
      assert.match(html, /<body>\s*<a class="saltar" href="#contenido">/);
    });

    it(`${ruta} marca la navegación principal`, () => {
      assert.match(html, /<nav aria-label="Principal">/);
    });
  }
});
