// Diet Plan Generator
document.getElementById('diet-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const condition = document.getElementById('health-condition').value;
    const preferences = document.getElementById('preferences').value;
    const result = `Your personalized diet plan for ${condition} and ${preferences} will be generated soon.`;
    document.getElementById('diet-result').innerText = result;
  });
  
  // Quiz Section
  const quizQuestions = [
    {
      question: "What percentage of the world's population faces hunger?",
      options: ["5%", "9.2%", "15%", "20%"],
      answer: "9.2%"
    },
    {
      question: "Which nutrient is essential for muscle repair?",
      options: ["Carbohydrates", "Fats", "Proteins", "Vitamins"],
      answer: "Proteins"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('quiz-question').innerText = question.question;
    const optionsHtml = question.options.map(option => `
      <label>
        <input type="radio" name="quiz-option" value="${option}"> ${option}
      </label>
    `).join('');
    document.getElementById('quiz-options').innerHTML = optionsHtml;
  }
  
  document.getElementById('quiz-submit').addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (selectedOption) {
      if (selectedOption.value === quizQuestions[currentQuestion].answer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < quizQuestions.length) {
        loadQuestion();
      } else {
        document.getElementById('quiz-feedback').innerText = `Quiz Over! Your score is ${score}/${quizQuestions.length}.`;
      }
    }
  });
  
  loadQuestion();
  // Smooth Scroll Function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start'      // Align to the top of the section
      });
    }
  }
  
  // Add Event Listeners to Buttons
  document.addEventListener('DOMContentLoaded', function () {
    // Homepage Buttons
    const exploreDietPlansButton = document.querySelector('button[onclick="location.href=\'#diet-plans\'"]');
    const takeQuizButton = document.querySelector('button[onclick="location.href=\'#quiz\'"]');
  
    if (exploreDietPlansButton) {
      exploreDietPlansButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        smoothScroll('#diet-plans'); // Smooth scroll to Diet Plans section
      });
    }
  
    if (takeQuizButton) {
      takeQuizButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        smoothScroll('#quiz'); // Smooth scroll to Quiz section
      });
    }
  });