// Open Trivia Database API URL
const apiUrl = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"; // Category 9 = General Knowledge

// Quiz Variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch Quiz Questions from API
async function fetchQuizQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results;
    loadQuestion();
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
  }
}

// Load Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  const questionElement = document.getElementById('quiz-question');
  const optionsElement = document.getElementById('quiz-options');

  // Display Question
  questionElement.innerHTML = question.question;

  // Display Options
  const options = [...question.incorrect_answers, question.correct_answer];
  options.sort(() => Math.random() - 0.5); // Shuffle options
  optionsElement.innerHTML = options
    .map(
      (option) => `
        <label>
          <input type="radio" name="quiz-option" value="${option}"> ${option}
        </label>
      `
    )
    .join('');
}

// Check Answer
function checkAnswer(selectedOption) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.correct_answer) {
    score++;
    document.getElementById('quiz-feedback').innerText = "Correct!";
  } else {
    document.getElementById('quiz-feedback').innerText = `Incorrect! The correct answer is: ${question.correct_answer}`;
  }
}

// Next Question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById('quiz-feedback').innerText = `Quiz Over! Your score is ${score}/${questions.length}.`;
    document.getElementById('quiz-submit').disabled = true;
  }
}

// Event Listener for Submit Button
document.getElementById('quiz-submit').addEventListener('click', function () {
  const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
  if (selectedOption) {
    checkAnswer(selectedOption.value);
    setTimeout(nextQuestion, 1500); // Wait 1.5 seconds before loading the next question
  } else {
    document.getElementById('quiz-feedback').innerText = "Please select an option!";
  }
});

// Initialize Quiz
fetchQuizQuestions();