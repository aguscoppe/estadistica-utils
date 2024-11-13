document
  .getElementById('weibullForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);

    const gamma = math.gamma;

    // Definir las ecuaciones
    const equations = function (params) {
      const k = params[0];
      const lambd = params[1];
      const eq1 = lambd * gamma(1 + 1 / k) - mu; // Ecuación de la media
      const eq2 =
        lambd * Math.sqrt(gamma(1 + 2 / k) - Math.pow(gamma(1 + 1 / k), 2)) -
        sigma; // Ecuación de la desviación estándar
      return [eq1, eq2];
    };

    // Suposiciones iniciales
    const initial_guess = [1.5, 50];

    // Resolver el sistema de ecuaciones
    const solution = math.nlsolve(equations, initial_guess);
    const k = solution[0];
    const lambd = solution[1];

    document.getElementById('resultado').innerText = `k = ${k.toFixed(
      4
    )}, λ = ${lambd.toFixed(4)}`;
  });

// Función para resolver sistemas de ecuaciones no lineales
math.nlsolve = function (f, x0) {
  const sol = math.optimize(f, x0);
  return sol._data;
};
