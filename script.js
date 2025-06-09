let currentStep = 0;
const steps = document.querySelectorAll(".card");

function showStep(index) {
  steps.forEach((step, i) => step.classList.add("hidden"));
  steps[index].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const resilienceScore = (avgC + avgA + avgS + avgE) / 4;

    let interpretation = '';
    let recommendation = '';

    if (resilienceScore >= 4.5) {
      interpretation = "🏆 Excellent resilience. You’re leading the way in organizational resilience.";
      recommendation = "Your proactive strategies across Coping Capacity, Adaptability, Sensitivity Reduction, and Exposure Control are commendable. To maintain momentum and future-proof your strategy, explore ASilva Innovations’ [RESOURCES](https://asilvainnovations.com/resources)—including case studies, toolkits, and thought leadership.";
    } else if (resilienceScore >= 3.5) {
      interpretation = "✅ Good resilience. You’re on the right track—keep building on your strengths.";
      recommendation = "Your organization demonstrates solid foundations. To elevate capabilities and close remaining gaps, explore ASilva Innovations’ [SOLUTIONS](https://asilvainnovations.com/solutions2) for tailored support.";
    } else if (resilienceScore >= 2.5) {
      interpretation = "⚠️ Moderate resilience. You’ve made progress, but key vulnerabilities remain.";
      recommendation = "Now is the time to strengthen adaptability and exposure control. Leverage practical tools from ASilva Innovations’ [SERVICES](https://asilvainnovations.com/services).";
    } else {
      interpretation = "❗ Low resilience. Immediate action is needed to protect your business.";
      recommendation = "Your current posture leaves your organization highly vulnerable. Start building a foundation today with ASilva Innovations’ [DDRiVE](https://asilvainnovations.com/ddrive)—a robust risk management solution.";
    }

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").innerHTML = `<strong>Average Resilience Score:</strong> ${resilienceScore.toFixed(2)}<br>${interpretation}`;
    document.getElementById("breakdown").innerHTML = `
      <ul>
        <li><strong>Avg Coping Capacity:</strong> ${avgC.toFixed(2)}</li>
        <li><strong>Avg Adaptability:</strong> ${avgA.toFixed(2)}</li>
        <li><strong>Avg Sensitivity Reduction:</strong> ${avgS.toFixed(2)}</li>
        <li><strong>Avg Exposure Control:</strong> ${avgE.toFixed(2)}</li>
      </ul>
      <p>${recommendation}</p>
    `;
    window.scrollTo({ top: document.getElementById("result").offsetTop - 20, behavior: 'smooth' });
  });
});