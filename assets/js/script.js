// Initialize variables
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;

// DOM elements
var startScreen = document.getElementById("start-screen");
var questionsDiv = document.getElementById("questions");
var endScreen = document.getElementById("end-screen");
var feedbackDiv = document.getElementById("feedback");
var timeSpan = document.getElementById("time");
var choicesDiv = document.getElementById("choices");
var initialsInput = document.getElementById("initials");
var finalScoreSpan = document.getElementById("final-score");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");

// Quiz questions (replace this array with your questions from questions.js)
var questions = [
  // Example question format
  {
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HyperText Modeling Language", "High Level Text Machine Language"],
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    choices: ["<link>", "<a>", "<href>"],
    correctAnswer: "<a>",
  },
  {
    question: "What is the purpose of CSS?",
    choices: ["To structure web pages", "To control the presentation of web pages", "To define web page content"],
    correctAnswer: "To control the presentation of web pages",
  },
  {
    question: "What is JavaScript primarily used for?",
    choices: ["Styling web pages", "Creating dynamic content", "Defining web page structure"],
    correctAnswer: "Creating dynamic content",
  },
  {
    question: "Which symbol is used to select an ID in CSS?",
    choices: ["#", ".", "&"],
    correctAnswer: "#",
  },
  // Add more questions as needed
];

// Event listener for start button
startBtn.addEventListener("click", startQuiz);

// Event listener for choices
choicesDiv.addEventListener("click", function (event) {
  var target = event.target;

  if (target.matches("button")) {
    // Check if the clicked choice is correct
    checkAnswer(target.textContent);

    // Move to the next question
    nextQuestion();
  }
});

// Event listener for submit button
submitBtn.addEventListener("click", function () {
  // Save the score and initials
  saveScore();

  // Reset the quiz
  resetQuiz();
});

// Function to start the quiz
function startQuiz() {
  startScreen.classList.add("hide");
  questionsDiv.classList.remove("hide");

  // Start the timer
  startTimer();

  // Display the first question
  displayQuestion();
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timeSpan.textContent = timeLeft;

    // Check if time is up
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display a question
function displayQuestion() {
  // Retrieve the current question from the array
  var currentQuestion = questions[currentQuestionIndex];

  // Display the question title
  document.getElementById("question-title").textContent = currentQuestion.question;

  // Clear previous choices
  choicesDiv.innerHTML = "";

  // Display choices
  currentQuestion.choices.forEach(function (choice) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choicesDiv.appendChild(choiceBtn);
  });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedAnswer) {
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    // Display correct feedback
    displayFeedback("Correct!", "green");
  } else {
    // Display incorrect feedback
    displayFeedback("Wrong!", "red");

    // Subtract time for incorrect answer
    timeLeft -= 10;
  }
}

// Function to display feedback
function displayFeedback(message, color) {
  feedbackDiv.textContent = message;
  feedbackDiv.style.color = color;

  // Show feedback for 1 second
  setTimeout(function () {
    feedbackDiv.textContent = "";
  }, 1000);
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  // Check if all questions are answered
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval); // Stop the timer

  // Display the end screen
  questionsDiv.classList.add("hide");
  endScreen.classList.remove("hide");

  // Display the final score
  finalScoreSpan.textContent = timeLeft;
}

// Function to save the score
function saveScore() {
  var initials = initialsInput.value.trim();

  if (initials !== "") {
    // Save the score to local storage or your preferred method
    console.log("Initials:", initials);
    console.log("Final Score:", timeLeft);
  }
}

// Function to reset the quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  timeLeft = 75;

  // Reset UI
  startScreen.classList.remove("hide");
  endScreen.classList.add("hide");

  // Reset timer display
  timeSpan.textContent = timeLeft;

  // Clear initials input
  initialsInput.value = "";

  // Clear any previous feedback
  feedbackDiv.textContent = "";
  feedbackDiv.style.color = "";

  // Clear previous choices
  choicesDiv.innerHTML = "";
}

