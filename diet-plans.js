// Enhanced JavaScript with suggestions and case-insensitive handling
const dietPlans = {
  "diabetes": {
    description: "A diet plan for managing blood sugar levels.",
    plan: [
      "Eat whole grains like oats and brown rice.",
      "Include lean proteins like chicken and fish.",
      "Avoid sugary drinks and processed foods.",
      "Eat plenty of vegetables and fruits with low glycemic index."
    ]
  },
  "high blood pressure": {
    description: "A diet plan to help lower blood pressure.",
    plan: [
      "Reduce sodium intake.",
      "Eat potassium-rich foods like bananas and spinach.",
      "Include whole grains and lean proteins.",
      "Avoid processed and fried foods."
    ]
  },
  "obesity": {
    description: "A diet plan for weight management.",
    plan: [
      "Focus on portion control.",
      "Eat more fruits, vegetables, and whole grains.",
      "Limit high-calorie and high-fat foods.",
      "Stay hydrated and avoid sugary drinks."
    ]
  }
};

// Format disease name to title case
function formatDiseaseName(key) {
  return key.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Search suggestions functionality
const diseaseSearch = document.getElementById('disease-search');
const suggestionsDiv = document.getElementById('suggestions');

diseaseSearch.addEventListener('input', function(e) {
  const input = e.target.value.toLowerCase().trim();
  const suggestions = Object.keys(dietPlans).filter(key => 
    key.includes(input)
  );
  
  suggestionsDiv.innerHTML = '';
  
  if (input && suggestions.length > 0) {
    suggestions.forEach(key => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = formatDiseaseName(key);
      div.onclick = () => {
        diseaseSearch.value = formatDiseaseName(key);
        suggestionsDiv.style.display = 'none';
        document.getElementById('search-button').click();
      };
      suggestionsDiv.appendChild(div);
    });
    suggestionsDiv.style.display = 'block';
  } else {
    suggestionsDiv.style.display = 'none';
  }
});

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) {
    suggestionsDiv.style.display = 'none';
  }
});

// Search functionality
document.getElementById('search-button').addEventListener('click', function() {
  const searchTerm = diseaseSearch.value.toLowerCase().trim();
  const planDetails = document.getElementById('plan-details');
  
  if (dietPlans[searchTerm]) {
    const plan = dietPlans[searchTerm];
    planDetails.innerHTML = `
      <h3>${formatDiseaseName(searchTerm)}</h3>
      <p><strong>Description:</strong> ${plan.description}</p>
      <ul>
        ${plan.plan.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  } else {
    planDetails.innerHTML = `<p>No diet plan found for "${formatDiseaseName(searchTerm)}". Please try another search term.</p>`;
  }
});