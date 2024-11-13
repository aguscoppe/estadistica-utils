document
  .getElementById('lognormalForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const promedio = parseFloat(document.getElementById('promedio').value);
    const desvio = parseFloat(document.getElementById('desvio').value);

    const calcular_m = (promedio, desvio) => {
      return Math.log(promedio / Math.sqrt(1 + Math.pow(desvio / promedio, 2)));
    };

    const calcular_D = (promedio, desvio) => {
      return Math.sqrt(Math.log(1 + Math.pow(desvio / promedio, 2)));
    };

    const m_hat = calcular_m(promedio, desvio);
    const D = calcular_D(promedio, desvio);

    document.getElementById('resultado').innerText = `m̂ = ${m_hat.toFixed(
      4
    )}, D = ${D.toFixed(4)}`;
  });
