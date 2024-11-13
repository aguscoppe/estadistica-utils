function generateTable() {
  const numFilas = parseInt(document.getElementById('numFilas').value);
  const tableBody = document
    .getElementById('dataTable')
    .getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear any existing rows

  for (let i = 0; i < numFilas; i++) {
    const row = tableBody.insertRow();

    const cellX = row.insertCell(0);
    cellX.innerHTML = `<input type="number" step="0.01" class="xStart" required> - <input type="number" step="0.01" class="xEnd" required>`;

    const cellFOi = row.insertCell(1);
    cellFOi.innerHTML = `<input type="number" step="0.01" class="foi" required>`;

    const cellPki = row.insertCell(2);
    cellPki.innerHTML = `<input type="number" step="0.01" class="pki" required disabled>`;

    const cellFEi = row.insertCell(3);
    cellFEi.innerHTML = `<input type="number" step="0.01" class="fei" readonly>`;
  }

  document.getElementById('step2').style.display = 'block';
}

function calculateStats() {
  const xStart = document.getElementsByClassName('xStart');
  const xEnd = document.getElementsByClassName('xEnd');
  const foi = document.getElementsByClassName('foi');
  let sumFOi = 0,
    sumXFOi = 0,
    sumX2FOi = 0;
  let n = xStart.length;

  for (let i = 0; i < n; i++) {
    const xMid = (parseFloat(xStart[i].value) + parseFloat(xEnd[i].value)) / 2;
    const freq = parseFloat(foi[i].value);

    sumFOi += freq;
    sumXFOi += xMid * freq;
    sumX2FOi += Math.pow(xMid, 2) * freq;
  }

  const mean = sumXFOi / sumFOi;
  const variance = sumX2FOi / sumFOi - Math.pow(mean, 2);
  const stdDev = Math.sqrt(variance);

  document.getElementById('mean').innerText = mean.toFixed(4);
  document.getElementById('stdDev').innerText = stdDev.toFixed(4);

  document.getElementById('step3').style.display = 'block';
}

function calculateModelParams() {
  const model = document.getElementById('modelSelect').value;
  const mean = parseFloat(document.getElementById('mean').innerText);
  const stdDev = parseFloat(document.getElementById('stdDev').innerText);
  let params;

  switch (model) {
    case 'gumbel_max':
      params = calculateGumbelMaxParams(mean, stdDev);
      break;
    case 'gumbel_min':
      params = calculateGumbelMinParams(mean, stdDev);
      break;
    case 'weibull':
      params = calculateWeibullParams(mean, stdDev);
      break;
    case 'lognormal':
      params = calculateLogNormalParams(mean, stdDev);
      break;
    case 'gamma':
      params = calculateGammaParams(mean, stdDev);
      break;
    default:
      params = null;
      break;
  }

  if (params) {
    displayModelParams(params);
    enablePkiInputs();
  }
}

function displayModelParams(params) {
  const modelParamsDiv = document.getElementById('modelParams');
  modelParamsDiv.innerHTML = '';

  for (const [key, value] of Object.entries(params)) {
    const paramElem = document.createElement('p');
    paramElem.innerText = `${key} = ${value.toFixed(4)}`;
    modelParamsDiv.appendChild(paramElem);
  }
}

function enablePkiInputs() {
  const pkiInputs = document.getElementsByClassName('pki');
  for (let input of pkiInputs) {
    input.disabled = false;
  }

  document.getElementById('step4').style.display = 'block';
}

function calculateFEi() {
  const foi = document.getElementsByClassName('foi');
  const pki = document.getElementsByClassName('pki');
  const fei = document.getElementsByClassName('fei');
  let n = foi.length;

  // Calcular la suma total de FOi
  let sumFOi = 0;
  for (let i = 0; i < n; i++) {
    sumFOi += parseFloat(foi[i].value);
  }

  // Verificar que la suma de P(ki) sea igual a 1
  let sumPki = 0;
  for (let i = 0; i < n; i++) {
    sumPki += parseFloat(pki[i].value);
  }

  if (Math.abs(sumPki - 1) > 0.0001) {
    document.getElementById('warning').innerText =
      'Advertencia: La suma de P(ki) debe ser igual a 1.';
    return;
  } else {
    document.getElementById('warning').innerText = '';
  }

  // Calcular FEi
  for (let i = 0; i < n; i++) {
    const prob = parseFloat(pki[i].value);
    fei[i].value = (sumFOi * prob).toFixed(4);
  }
}

function calculateGumbelMaxParams(mean, stdDev) {
  const gamma = 0.57721;
  const beta = (stdDev * Math.sqrt(6)) / Math.PI;
  const theta = mean - beta * gamma;
  return { beta, theta };
}

function calculateGumbelMinParams(mean, stdDev) {
  const gamma = 0.57721;
  const beta = (stdDev * Math.sqrt(6)) / Math.PI;
  const theta = mean + beta * gamma;
  return { beta, theta };
}

function calculateWeibullParams(mean, stdDev) {
  // Cálculo del parámetro de forma (beta)
  const beta = (stdDev / mean) * Math.sqrt(Math.PI / 2);

  // Cálculo del parámetro de escala (omega)
  const gamma = Math.gamma
    ? Math.gamma
    : function (z) {
        // Función gamma aproximada
        if (z === 0) return Infinity;
        let g = 1;
        for (let i = 1; i <= z; i++) {
          g *= i;
        }
        return g;
      };
  const omega = mean / gamma(1 + 1 / beta); // Gamma(1 + 1/beta)

  return { beta, omega };
}

function calculateLogNormalParams(mean, stdDev) {
  const m = Math.log(mean / Math.sqrt(1 + Math.pow(stdDev / mean, 2)));
  const s = Math.sqrt(Math.log(1 + Math.pow(stdDev / mean, 2)));
  return { m, s };
}

function calculateGammaParams(mean, stdDev) {
  const k = Math.pow(mean / stdDev, 2);
  const lambda = Math.pow(stdDev, 2) / mean;
  return { k, lambda };
}
