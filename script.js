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

    function generateQuestions(container, data) {
  for (const [section, questions] of Object.entries(data)) {
    const sectionHeader = document.createElement("h3");
    sectionHeader.textContent = section;
    container.appendChild(sectionHeader);

    questions.forEach((text, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.innerHTML = `
        <p>${text}</p>
        <div class="rating">
          ${[1,2,3,4,5].map(value => `
            <label>
              <input type="radio" name="${section}-${index}" value="${value}" required>
              ${value}
            </label>
          `).join('')}
        </div>
      `;
      container.appendChild(questionDiv);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const challengeContainer = document.querySelector(".question-set");
  const rolesContainer = document.getElementById("roles-section");
  generateQuestions(challengeContainer, challenges);
  generateQuestions(rolesContainer, roles);


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
      recommendation = "Your proactive strategies across Coping Capacity, Adaptability, Sensitivity Reduction, and Exposure Control are commendable. To maintain momentum and future-proof your strategy, explore ASilva Innovations’RESOURCES including relevant articles, toolkits, and thought leadership.";
      <div class="button-group">
      <a href="https://asilvainnovations.com/resources" class="btn primary" target="_blank">EXPLORE RESOURCES</a>
      <a href="https://asilvainnovations.com/ddrive" class="btn secondary" target="_blank">BACK TO HOME</a> </div>`;
    }
    } else if (resilienceScore >= 3.5) {
      interpretation = "✅ Good resilience. You’re on the right track—keep building on your strengths."
      recommendation = "Your organization demonstrates solid foundations. To elevate capabilities and close remaining gaps, explore ASilva Innovations’ Solutions for tailored support";
      <div class="button-group">
      <a href="https://asilvainnovations.com/solutions" class="btn primary" target="_blank">EXPLORE SOLUTIONS</a>
      <a href="https://asilvainnovations.com/ddrive" class="btn secondary" target="_blank">BACK TO HOME</a></div>`;
      }
    } else if (resilienceScore >= 2.5) {
      interpretation = "⚠️ Moderate resilience. You’ve made progress, but key vulnerabilities remain.";
      recommendation = "Now is the time to strengthen adaptability and exposure control. Leverage practical tools from ASilva Innovations’ SERVICES.
    <div class="button-group">
      <a href="https://asilvainnovations.com/services" class="btn primary" target="_blank">EXPLORE SERVICES</a>
      <a href="https://asilvainnovations.com/ddrive" class="btn secondary" target="_blank">BACK TO HOME</a></div>`;
    } else {
      interpretation = "❗ Low resilience. Immediate action is needed to protect your business.";
      recommendation = "Your current posture leaves your organization highly vulnerable. Start building a foundation today with ASilva Innovations’ DDRiVE—a robust risk management solution.";
     <div class="button-group">
      <a href="https://asilvainnovations.com/ddrive" class="btn primary" target="_blank">EXPLORE DDRiVE</a></div>`;
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
