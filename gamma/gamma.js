document
  .getElementById('gammaForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const lambda = parseFloat(document.getElementById('lambda').value);
    const r = parseFloat(document.getElementById('r').value);
    const x = parseFloat(document.getElementById('x').value);

    const gamma = (n) => {
      if (n === 1) return 1;
      return (n - 1) * gamma(n - 1);
    };

    const probabilidadGamma = (x, lambda, r) => {
      const part1 = Math.pow(lambda, r) / gamma(r);
      const part2 = Math.pow(x, r - 1) * Math.exp(-lambda * x);
      return part1 * part2;
    };

    const resultado = probabilidadGamma(x, lambda, r);
    document.getElementById('resultado').innerText = `f(x) = ${resultado}`;
  });
