document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sparcForm');
  const resultDiv = document.getElementById('result');
  const scoreParagraph = document.getElementById('score');
  const interpretationParagraph = document.getElementById('interpretation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const coping = parseInt(document.getElementById('coping').value, 10);
    const adaptability = parseInt(document.getElementById('adaptability').value, 10);
    const sensitivity = parseInt(document.getElementById('sensitivity').value, 10);
    const exposure = parseInt(document.getElementById('exposure').value, 10);

    const resilienceScore = (coping + adaptability) - (sensitivity + exposure);

    scoreParagraph.textContent = `Resilience Score: ${resilienceScore}`;

    let interpretation = '';
    if (resilienceScore >= 6) {
      interpretation = 'Excellent resilience. Your business is well-prepared for disasters.';
    } else if (resilienceScore >= 3) {
      interpretation = 'Good resilience. There is room for improvement.';
    } else if (resilienceScore >= 0) {
      interpretation = 'Moderate resilience. Consider enhancing your preparedness strategies.';
    } else {
      interpretation = 'Low resilience. Immediate action is recommended to improve disaster preparedness.';
    }

    // Personalized recommendations
    let recommendations = '<h3>Personalized Recommendations:</h3><ul>';

    if (coping <= 2) {
      recommendations += '<li><strong>Coping Capacity:</strong> Develop contingency plans and train staff on emergency response protocols.</li>';
    }

    if (adaptability <= 2) {
      recommendations += '<li><strong>Adaptability:</strong> Increase organizational flexibility by adopting digital tools and encouraging innovation.</li>';
    }

    if (sensitivity >= 4) {
      recommendations += '<li><strong>Sensitivity:</strong> Reduce reliance on vulnerable resources and diversify your supply chain.</li>';
    }

    if (exposure >= 4) {
      recommendations += '<li><strong>Exposure:</strong> Assess geographic and operational risks and invest in risk mitigation strategies.</li>';
    }

    recommendations += '</ul>';

    interpretationParagraph.innerHTML = `<p>${interpretation}</p>${recommendations}`;
    resultDiv.classList.remove('hidden');
  });
});
