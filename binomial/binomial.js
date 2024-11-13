document
  .getElementById('binomialForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const n = parseInt(document.getElementById('n').value);
    const p = parseFloat(document.getElementById('p').value);
    const r = parseInt(document.getElementById('r').value);

    const combinatoria = (n, r) => {
      let result = 1;
      for (let i = 0; i < r; i++) {
        result *= (n - i) / (i + 1);
      }
      return result;
    };

    const probabilidadBinomial = (n, p, r) => {
      return combinatoria(n, r) * Math.pow(p, r) * Math.pow(1 - p, n - r);
    };

    const resultado = probabilidadBinomial(n, p, r);
    document.getElementById(
      'resultado'
    ).innerText = `P(X = ${r}) = ${resultado}`;
  });
