export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/recursos': 'recursos' });

  eleventyConfig.addCollection('noticias', (coleccion) =>
    coleccion.getFilteredByGlob('src/contenido/noticias/*.md').sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addFilter('fechaLarga', (fecha) =>
    new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeZone: 'UTC' }).format(fecha),
  );

  eleventyConfig.addFilter('primeros', (lista, n) => lista.slice(0, n));

  eleventyConfig.addFilter('fechaIso', (fecha) => fecha.toISOString().slice(0, 10));

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
