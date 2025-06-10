// --- Module: Step Navigation ---
let currentStep = 0;
const steps = document.querySelectorAll(".card");

/**
 * Show the step at the given index, managing focus and highlighting.
 * @param {number} index 
 */
const showStep = (index) => {
  steps.forEach((step, i) => {
    step.classList.add("hidden");
    step.classList.remove("active-step");
    if (i === index) {
      step.classList.remove("hidden");
      step.classList.add("active-step");
      step.setAttribute("tabindex", "-1");
      step.focus();
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const nextStep = () => {
  if (currentStep < steps.length - 2) {
    currentStep++;
    showStep(currentStep);
  }
};

const prevStep = () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
};

// --- Module: Question Generation ---
/**
 * Generate questions and append to container using DocumentFragment for performance.
 * @param {HTMLElement} container 
 * @param {object} data 
 */
const generateQuestions = (container, data) => {
  const fragment = document.createDocumentFragment();

  Object.entries(data).forEach(([section, questions]) => {
    const sectionHeader = document.createElement("h3");
    sectionHeader.textContent = section;
    sectionHeader.setAttribute("tabindex", "0");
    fragment.appendChild(sectionHeader);

    questions.forEach((text, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.setAttribute("aria-label", text);

      const ratings = [1, 2, 3, 4, 5].map(value => `
        <label>
          <input type="radio" name="${section}-${index}" value="${value}" required aria-label="Rating ${value} for ${text}">
          ${value}
        </label>
      `).join('');

      questionDiv.innerHTML = `
        <p>${sanitizeHTML(text)}</p>
        <div class="rating" role="radiogroup" aria-labelledby="${section}-${index}-label">
          ${ratings}
        </div>
      `;
      fragment.appendChild(questionDiv);
    });
  });

  container.appendChild(fragment);
};

// --- Module: Resilience Score Calculation ---
/**
 * Calculate averages and resilience score from input values.
 * @param {number[]} inputs 
 * @returns {object}
 */
const calculateResilienceScores = (inputs) => {
  if (inputs.length < 20) throw new Error("Not enough input values.");

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
  return { avgC, avgA, avgS, avgE, resilienceScore };
};

/**
 * Sanitize dynamic HTML content to prevent XSS.
 * @param {string} str 
 * @returns {string}
 */
const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

/**
 * Get resilience interpretation and recommendation based on score.
 * @param {number} resilienceScore 
 * @returns {{interpretation: string, recommendation: string}}
 */
const getResilienceFeedback = (resilienceScore) => {
  let interpretation = '';
  let recommendation = '';

  if (resilienceScore >= 4.5) {
    interpretation = "🏆 Excellent resilience. You’re leading the way in organizational resilience.";
    recommendation = `
      <p>Your proactive strategies across Coping Capacity, Adaptability, Sensitivity Reduction, and Exposure Control are commendable. To maintain momentum and future-proof your strategy, explore more resources.</p>
      <div class="button-group">
        <a href="https://asilvainnovations.com/resources" class="btn primary" target="_blank" rel="noopener">EXPLORE RESOURCES</a>
        <a href="https://asilvainnovations.com/ddrive" class="btn secondary" target="_blank" rel="noopener">BACK TO HOME</a>
      </div>
    `;
  } else if (resilienceScore >= 3.5) {
    interpretation = "✅ Good resilience. You’re on the right track—keep building on your strengths";
    recommendation = `
      <p>Your organization demonstrates solid foundations. To elevate capabilities and close remaining gaps, explore ASilva Innovations’ Solutions for tailored support.</p>
      <div class="button-group">
        <a href="https://asilvainnovations.com/solutions" class="btn primary" target="_blank" rel="noopener">EXPLORE SOLUTIONS</a>
        <a href="https://asilvainnovations.com/ddrive" class="btn secondary" target="_blank" rel="noopener">BACK TO HOME</a>
      </div>
    `;
  } else if (resilienceScore >= 2.5) {
    interpretation = "⚠️ Moderate resilience. You’ve made progress, but key vulnerabilities remain.";
    recommendation = `
      <p>Now is the time to strengthen adaptability and exposure control. Leverage practical tools from ASilva Innovations’ SERVICES.</p>
      <div class="button-group">
        <a href="https://asilvainnovations.com/services" class="btn primary" target="_blank" rel="noopener">EXPLORE SERVICES</a>
        <a href="https://asilvainnovations.com/ddrive" class="btn secondary" target="_blank" rel="noopener">BACK TO HOME</a>
      </div>
    `;
  } else {
    interpretation = "❗ Low resilience. Immediate action is needed to protect your business.";
    recommendation = `
      <p>Your current posture leaves your organization highly vulnerable. Start building a foundation today with ASilva Innovations’ DDRiVE—a robust risk management solution.</p>
      <div class="button-group">
        <a href="https://asilvainnovations.com/ddrive" class="btn primary" target="_blank" rel="noopener">EXPLORE DDRiVE</a>
      </div>
    `;
  }
  return { interpretation, recommendation };
};

// --- Module: Utility Functions ---
/**
 * Validate that all required inputs are filled and within acceptable range.
 * @param {HTMLFormElement} form 
 * @returns {boolean}
 */
const validateForm = (form) => {
  const numberInputs = form.querySelectorAll('input[type="number"]');
  for (let input of numberInputs) {
    const value = Number(input.value);
    if (isNaN(value) || value < 1 || value > 5) {
      input.focus();
      alert("Please provide valid ratings between 1 and 5.");
      return false;
    }
  }
  return true;
};

// --- Module: Event Handling ---
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);

  // Example: Attach event delegation for future scalability
  document.body.addEventListener('click', event => {
    if (event.target.matches('.back-to-top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Generate questions (assumes global 'challenges' and 'roles' objects exist)
  const challengeContainer = document.querySelector(".question-set");
  const rolesContainer = document.getElementById("roles-section");
  if (challengeContainer && rolesContainer && typeof challenges !== "undefined" && typeof roles !== "undefined") {
    generateQuestions(challengeContainer, challenges);
    generateQuestions(rolesContainer, roles);
  }

  // Form Submission
  const form = document.getElementById("sparcForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateForm(form)) return;

      try {
        // Collect all selected radio values for scoring
        const inputs = Array.from(form.querySelectorAll('input[type="radio"]:checked')).map(input => parseInt(input.value));
        const { avgC, avgA, avgS, avgE, resilienceScore } = calculateResilienceScores(inputs);

        const { interpretation, recommendation } = getResilienceFeedback(resilienceScore);

        document.getElementById("result").classList.remove("hidden");
        document.getElementById("score").innerHTML = `
          <strong>Average Resilience Score:</strong> ${resilienceScore.toFixed(2)}<br>${sanitizeHTML(interpretation)}
        `;
        document.getElementById("breakdown").innerHTML = `
          <ul>
            <li><strong>Avg Coping Capacity:</strong> ${avgC.toFixed(2)}</li>
            <li><strong>Avg Adaptability:</strong> ${avgA.toFixed(2)}</li>
            <li><strong>Avg Sensitivity Reduction:</strong> ${avgS.toFixed(2)}</li>
            <li><strong>Avg Exposure Control:</strong> ${avgE.toFixed(2)}</li>
          </ul>
          ${recommendation}
        `;

        window.scrollTo({ top: document.getElementById("result").offsetTop - 20, behavior: 'smooth' });
      } catch (err) {
        alert("An error occurred while calculating your resilience score. Please check your input and try again.");
        console.error(err);
      }
    });
  }

  // Add "Back to Top" button dynamically if not present
  if (!document.querySelector('.back-to-top')) {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.textContent = 'Back to Top';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
  }
});
