document
  .getElementById('gumbelMaxForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const beta = parseFloat(document.getElementById('beta').value);
    const theta = parseFloat(document.getElementById('theta').value);
    const x = parseFloat(document.getElementById('x').value);

    const probabilidadGumbelMax = (x, beta, theta) => {
      const z = (x - theta) / beta;
      const part1 = (1 / beta) * Math.exp(-z);
      const part2 = Math.exp(-Math.exp(z));
      return part1 * part2;
    };

    const resultado = probabilidadGumbelMax(x, beta, theta);
    document.getElementById('resultado').innerText = `f(x) = ${resultado}`;
  });
