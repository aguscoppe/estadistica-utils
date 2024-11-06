document
  .getElementById('calcForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const R = parseFloat(document.getElementById('R').value);
    const alpha = parseFloat(document.getElementById('alpha').value);
    const beta = parseFloat(document.getElementById('beta').value);

    const epsilon = 0.0001;
    let nu = 1;
    let nuPrevio;

    do {
      nuPrevio = nu;

      const t_alpha = jStat.studentt.inv(1 - alpha, nu);
      const t_beta = jStat.studentt.inv(1 - beta, nu);

      nu =
        (4 *
          Math.sqrt(R) *
          (t_alpha + t_beta * Math.sqrt(R)) *
          (t_alpha * Math.sqrt(R) + t_beta)) /
        Math.pow(R - 1, 2);
    } while (Math.abs(nu - nuPrevio) > epsilon);

    // Mostrar resultados
    document.querySelector('h2.hidden').classList.remove('hidden');
    document.getElementById(
      'result'
    ).textContent = `El valor de grados de libertad es: ${nu.toFixed(4)}`;
    document.getElementById('result').classList.remove('hidden');

    // Calcular y mostrar el resultado redondeado hacia arriba
    const roundedNu = Math.ceil(nu);
    document.getElementById(
      'roundedResult'
    ).textContent = `Resultado redondeado: ${roundedNu}`;
    document.getElementById('roundedResult').classList.remove('hidden');

    // Calcular y mostrar los resultados de t
    const tAlpha = jStat.studentt.inv(1 - alpha, roundedNu);
    const tBeta = jStat.studentt.inv(1 - beta, roundedNu);

    document.getElementById(
      'tAlphaResult'
    ).textContent = `t(1 - α ; v) → t(1 - ${alpha} ; ${roundedNu}) = ${tAlpha.toFixed(
      4
    )}`;
    document.getElementById(
      'tBetaResult'
    ).textContent = `t(1 - β ; v) → t(1 - ${beta} ; ${roundedNu}) = ${tBeta.toFixed(
      4
    )}`;

    document.getElementById('tAlphaResult').classList.remove('hidden');
    document.getElementById('tBetaResult').classList.remove('hidden');
  });
