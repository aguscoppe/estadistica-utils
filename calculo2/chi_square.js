function calculateChiSquare() {
  // Get the input values
  const observedInput = document.getElementById('observed').value;
  const expectedInput = document.getElementById('expected').value;

  // Convert input strings to arrays of numbers
  const observed = observedInput.split(',').map(Number);
  const expected = expectedInput.split(',').map(Number);

  // Check if the lengths of the arrays match
  if (observed.length !== expected.length) {
    document.getElementById('result').textContent =
      'Error: The number of observed and expected frequencies must match.';
    return;
  }

  // Calculate the chi-square statistic
  let chiSquare = 0;
  for (let i = 0; i < observed.length; i++) {
    chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
  }

  // Display the result
  document.getElementById(
    'result'
  ).textContent = `Chi-Square Statistic: ${chiSquare.toFixed(4)}`;
}
