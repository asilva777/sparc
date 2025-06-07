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
  let recommendation = '';

  if (resilienceScore >= 6) {
    interpretation = "🏆 Excellent resilience. Your business is well-prepared for disasters.";
    recommendation = "As a resilience expert, I commend your proactive measures. To maintain this level, consider exploring ASilva Innovations' [Resources](https://asilvainnovations.com/resources) for the latest best practices.";
  } else if (resilienceScore >= 3) {
    interpretation = "✅ Good resilience. There's some room for improvement.";
    recommendation = "You're on the right track. To enhance your preparedness, explore ASilva Innovations' [Solutions](https://asilvainnovations.com/solutions) tailored to your needs.";
  } else if (resilienceScore >= 0) {
    interpretation = "⚠️ Moderate resilience. Consider strengthening weak areas.";
    recommendation = "Identifying and addressing vulnerabilities is crucial. Engage with ASilva Innovations' [Services](https://asilvainnovations.com/solutions) to develop a comprehensive resilience strategy.";
  } else {
    interpretation = "❗ Low resilience. Immediate action is recommended.";
    recommendation = "Your business faces significant risks. It's imperative to consult with ASilva Innovations' [Services](https://asilvainnovations.com/solutions) to formulate a robust disaster preparedness plan.";
  }

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerHTML = `<strong>Average Resilience Score:</strong> ${resilienceScore.toFixed(2)}<br>${interpretation}`;
  document.getElementById("breakdown").innerHTML = `
    <ul>
      <li><strong>Avg Coping Capacity (C):</strong> ${avgC.toFixed(2)}</li>
      <li><strong>Avg Adaptability (A):</strong> ${avgA.toFixed(2)}</li>
      <li><strong>Avg Sensitivity Reduction (S):</strong> ${avgS.toFixed(2)}</li>
      <li><strong>Avg Exposure Control (E):</strong> ${avgE.toFixed(2)}</li>
    </ul>
    <p>${recommendation}</p>
  `;
});
