let currentStep = 0;
const totalSteps = 5;

function showStep(step) {
  document.querySelectorAll('.card').forEach((card, index) => {
    card.classList.add('hidden');
    if (index === step) card.classList.remove('hidden');
  });
}

function nextStep() {
  if (currentStep < totalSteps - 1) {
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
  showStep(0); // Show personal info step

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
    if (score >= 6) {
      feedback = "🏆 Excellent resilience.";
    } else if (score >= 3) {
      feedback = "✅ Good resilience.";
    } else if (score >= 0) {
      feedback = "⚠️ Moderate resilience.";
    } else {
      feedback = "❗ Low resilience.";
    }

    document.getElementById("score").innerHTML = `<strong>Score:</strong> ${score.toFixed(2)}<br>${feedback}`;
    document.getElementById("breakdown").innerHTML = `
      <ul>
        <li>Avg Coping: ${avgC.toFixed(2)}</li>
        <li>Avg Adaptability: ${avgA.toFixed(2)}</li>
        <li>Avg Sensitivity: ${avgS.toFixed(2)}</li>
        <li>Avg Exposure: ${avgE.toFixed(2)}</li>
      </ul>
    `;
    showStep(totalSteps); // show result card
  });
});
