document
  .getElementById('poissonForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const lambda = parseFloat(document.getElementById('lambda').value);
    const r = parseInt(document.getElementById('r').value);

    const factorial = (n) => {
      if (n === 0) return 1;
      let result = 1;
      for (let i = 1; i <= n; i++) {
        result *= i;
      }
      return result;
    };

    const probabilidadPoisson = (lambda, r) => {
      return (Math.pow(lambda, r) * Math.exp(-lambda)) / factorial(r);
    };

    const resultado = probabilidadPoisson(lambda, r);
    document.getElementById(
      'resultado'
    ).innerText = `P(X = ${r}) = ${resultado}`;
  });
