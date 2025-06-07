document.getElementById("sparcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = Array.from(document.querySelectorAll('input[type="number"]')).map(input =>
    parseInt(input.value)
  );

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const coping = inputs.slice(0, 5);
  const adaptability = inputs.slice(5, 10);
  const sensitivity = inputs.slice(10, 15);
  const exposure = inputs.slice(15, 20);

  const avgC = avg(coping);
  const avgA = avg(adaptability);
  const avgS = avg(sensitivity);
  const avgE = avg(exposure);

  const resilienceScore = (avgC + avgA) - (avgS + avgE);

  let interpretation = '';
  if (resilienceScore >= 6) {
    interpretation = "🏆 Excellent resilience. Your business is well-prepared for disasters.";
  } else if (resilienceScore >= 3) {
    interpretation = "✅ Good resilience. There's some room for improvement.";
  } else if (resilienceScore >= 0) {
    interpretation = "⚠️ Moderate resilience. Consider strengthening weak areas.";
  } else {
    interpretation = "❗ Low resilience. Immediate action is recommended.";
  }

document.getElementById("result").classList.remove("hidden");
document.getElementById("score").textContent = `Your score is ${resilienceScore}`;

  document.getElementById("score").innerHTML = `<strong>Total Resilience Score:</strong> ${resilienceScore.toFixed(2)}<br>${interpretation}`;
  document.getElementById("breakdown").innerHTML = `
    <ul>
      <li><strong>Avg Coping Capacity (C):</strong> ${avgC.toFixed(2)}</li>
      <li><strong>Avg Adaptability (A):</strong> ${avgA.toFixed(2)}</li>
      <li><strong>Avg Sensitivity Reduction (S):</strong> ${avgS.toFixed(2)}</li>
      <li><strong>Avg Exposure Control (E):</strong> ${avgE.toFixed(2)}</li>
    </ul>
  `;

  document.getElementById("result").classList.remove("hidden");
});
