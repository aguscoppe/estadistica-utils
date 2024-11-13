document
  .getElementById('normalEstandarForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const z = parseFloat(document.getElementById('z').value);

    const probabilidadNormalEstandar = (z) => {
      const part1 = 1 / Math.sqrt(2 * Math.PI);
      const part2 = Math.exp(-0.5 * Math.pow(z, 2));
      return part1 * part2;
    };

    const resultado = probabilidadNormalEstandar(z);
    document.getElementById('resultado').innerText = `f(z) = ${resultado}`;
  });
