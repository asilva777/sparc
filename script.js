let currentStep = 0;
const steps = document.querySelectorAll(".card");

function showStep(index) {
  steps.forEach((step, i) => step.classList.add("hidden"));
  steps[index].classList.remove("hidden");
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

    const inputs = Array.from(document.querySelectorAll('input[type="number"]')).map(input =>
      parseInt(input.value)
    );

    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

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
      interpretation = "🏆 Excellent resilience.";
      recommendation = "As a resilience expert, I commend your proactive measures. Explore ASilva Innovations' [Resources](https://asilvainnovations.com/resources).";
    } else if (resilienceScore >= 3) {
      interpretation = "✅ Good resilience.";
      recommendation = "You're on the right track. Review ASilva Innovations' [Solutions](https://asilvainnovations.com/solutions).";
    } else if (resilienceScore >= 0) {
      interpretation = "⚠️ Moderate resilience.";
      recommendation = "Strengthen your weak areas with ASilva Innovations' [Services](https://asilvainnovations.com/solutions).";
    } else {
      interpretation = "❗ Low resilience.";
      recommendation = "Act now. Consult ASilva Innovations' [Services](https://asilvainnovations.com/solutions).";
    }

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").innerHTML = `<strong>Average Resilience Score:</strong> ${resilienceScore.toFixed(2)}<br>${interpretation}`;
    document.getElementById("breakdown").innerHTML = `
      <ul>
        <li><strong>Coping Capacity:</strong> ${avgC.toFixed(2)}</li>
        <li><strong>Adaptability:</strong> ${avgA.toFixed(2)}</li>
        <li><strong>Sensitivity:</strong> ${avgS.toFixed(2)}</li>
        <li><strong>Exposure:</strong> ${avgE.toFixed(2)}</li>
      </ul>
      <p>${recommendation}</p>
    `;
  });
});
