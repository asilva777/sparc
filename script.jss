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

    scoreParagraph.textContent = resilienceScore;

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

    interpretationParagraph.textContent = interpretation;
    resultDiv.classList.remove('hidden');
  });
});
