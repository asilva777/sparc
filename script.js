let currentStep = 0;
const steps = document.querySelectorAll(".card");

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.add("hidden");
    if (i === index) step.classList.remove("hidden");
  });
}

function nextStep() {
  if (currentStep < steps.length - 2) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);

  document.getElementById("sparcForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const scores = Array.from(document.querySelectorAll('input[type="number"]')).map(input =>
      parseInt(input.value)
    );

    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const coping = scores.slice(0, 5);
    const adaptability = scores.slice(5, 10);
    const sensitivity = scores.slice(10, 15);
    const exposure = scores.slice(15, 20);

    const avgC = avg(coping);
    const avgA = avg(adaptability);
    const avgS = avg(sensitivity);
    const avgE = avg(exposure);

    const score = (avgC + avgA) - (avgS + avgE);

    let feedback = "";
    if (score >= 6) feedback = "🏆 Excellent resilience.";
    else if (score >= 3) feedback = "✅ Good resilience.";
    else if (score >= 0) feedback = "⚠️ Moderate resilience.";
    else feedback = "❗ Low resilience.";

    document.getElementById("score").innerHTML = `<strong>Score:</strong> ${score.toFixed(2)}<br>${feedback}`;
    document.getElementById("breakdown").innerHTML = `
      <ul>
        <li>Avg Coping: ${avgC.toFixed(2)}</li>
        <li>Avg Adaptability: ${avgA.toFixed(2)}</li>
        <li>Avg Sensitivity: ${avgS.toFixed(2)}</li>
        <li>Avg Exposure: ${avgE.toFixed(2)}</li>
      </ul>
    `;
    showStep(steps.length - 1);
  });
});


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
