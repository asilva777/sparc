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

    if (resilienceScore >= 5) {
      interpretation = "🏆 Excellent resilience.You’re leading the way in organizational resilience."
      recommendation = "Your proactive strategies across Coping Capacity, Adaptability, Sensitivity Reduction, and Exposure Control are commendable. To maintain momentum and future-proof your resilience strategy, explore advanced tools and insights from ASilva Innovations’[RESOURCES](https://asilvainnovations.com/resources)— including case studies, toolkits, and thought leadership.";
    } else if (resilienceScore >= 3) {
      interpretation = "✅ Good resilience. You’re on the right track—keep building on your strengths."
      recommendation = "Your organization demonstrates solid resilience foundations. To elevate your capabilities and close remaining gaps, consider exploring ASilva Innovations’ [SOLUTIONS](https://asilvainnovations.com/solutions2)for tailored support in business continuity, risk management, and adaptive planning.";
    } else if (resilienceScore >= 2) {
      interpretation = "⚠️ Moderate resilience. You’ve made progress, but key vulnerabilities remain.";
      recommendation = "Now is the time to strengthen your weaker areas—especially in adaptability and exposure control. Leverage expert guidance and practical tools from ASilva Innovations’[SERVICES](https://asilvainnovations.com/services) to build a more robust and responsive resilience framework.";
    } else (resilienceScore >= 1) { 
      interpretation = "❗ Low resilience. Immediate action is needed to protect your business.";
      recommendation = "Act now. Your current resilience posture leaves your organization highly vulnerable to disruptions. Start building a solid foundation today with ASilva Innovations’ [DDRiVE](](https://asilvainnovations.com/ddrive)—an integrated risk management solution designed to help you assess, plan, and implement resilience strategies across all CASE dimensions.";
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
