// user.js - User functionality for taking quizzes

// Global variables
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];

// Function to display available quizzes
function displayAvailableQuizzes() {
    const quizzes = DataManager.getQuizzes();
    const quizListContainer = document.getElementById('availableQuizzes');

    if (!quizListContainer) return;

    quizListContainer.innerHTML = '';

    if (quizzes.length === 0) {
        quizListContainer.innerHTML = `<p>${getTranslation('no-quizzes-user')}</p>`;
        return;
    }

    quizzes.forEach(quiz => {
        const quizElement = document.createElement('div');
        quizElement.className = 'quiz-item';
        quizElement.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.questions.length} ${getTranslation('questions')}</p>
            <button class="start-quiz-btn" data-id="${quiz.id}">${getTranslation('start-quiz')}</button>
        `;

        quizListContainer.appendChild(quizElement);
    });

    // Add event listeners to start buttons
    document.querySelectorAll('.start-quiz-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            startQuiz(quizId);
        });
    });
}

// Function to start a quiz
function startQuiz(quizId) {
    currentQuiz = DataManager.getQuizById(quizId);
    if (!currentQuiz) return;

    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);

    // Hide quiz list and show quiz container
    document.getElementById('quizListSection').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('resultContainer').style.display = 'none';

    // Update quiz title
    document.getElementById('quizTitle').textContent = currentQuiz.title;

    // Display first question
    displayCurrentQuestion();

    // Update progress
    updateProgress();
}

// Function to display the current question
function displayCurrentQuestion() {
    if (!currentQuiz) return;

    const question = currentQuiz.questions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');

    questionContainer.innerHTML = `
        <h3 class="question-text">${question.text}</h3>
        <div class="options-container">
            ${question.options.map((option, index) => `
                <div class="option">
                    <input type="radio" id="option${index}" name="answer" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', function() {
            userAnswers[currentQuestionIndex] = parseInt(this.value);
            updateNavButtons();
        });
    });

    // Update navigation buttons
    updateNavButtons();
}

// Function to update navigation buttons
function updateNavButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');

    // Previous button
    prevButton.disabled = currentQuestionIndex === 0;

    // Next button
    nextButton.style.display = currentQuestionIndex < currentQuiz.questions.length - 1 ? 'inline-block' : 'none';

    // Submit button
    submitButton.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-block' : 'none';

    // Enable submit button only if current question is answered
    if (submitButton.style.display === 'inline-block') {
        submitButton.disabled = userAnswers[currentQuestionIndex] === null;
    }
}

// Function to update progress indicator
function updateProgress() {
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.innerHTML = '';

    for (let i = 0; i < currentQuiz.questions.length; i++) {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';

        if (i === currentQuestionIndex) {
            progressItem.classList.add('current');
        }

        if (userAnswers[i] !== null) {
            progressItem.classList.add('answered');
        }

        progressItem.addEventListener('click', function() {
            navigateToQuestion(i);
        });

        progressContainer.appendChild(progressItem);
    }

    // Update question counter
    document.getElementById('questionCounter').textContent = 
        `${getTranslation('question')} ${currentQuestionIndex + 1} ${getTranslation('of')} ${currentQuiz.questions.length}`;
}

// Function to navigate to a specific question
function navigateToQuestion(index) {
    if (index >= 0 && index < currentQuiz.questions.length) {
        currentQuestionIndex = index;
        displayCurrentQuestion();
        updateProgress();
    }
}

// Function to navigate to the previous question
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
        updateProgress();
    }
}

// Function to navigate to the next question
function goToNextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
        updateProgress();
    }
}

// Function to calculate the quiz score
function calculateScore() {
    if (!currentQuiz) return 0;

    let score = 0;
    for (let i = 0; i < currentQuiz.questions.length; i++) {
        if (userAnswers[i] === currentQuiz.questions[i].correctAnswer) {
            score++;
        }
    }

    return score;
}

// Function to submit the quiz
function submitQuiz() {
    // Check if all questions are answered
    const unansweredQuestions = userAnswers.findIndex(answer => answer === null);

    if (unansweredQuestions !== -1) {
        const unansweredCount = userAnswers.filter(a => a === null).length;
        if (!confirm(getTranslation('unanswered-questions', unansweredCount))) {
            navigateToQuestion(unansweredQuestions);
            return;
        }
    }

    // Calculate score
    const score = calculateScore();
    const totalQuestions = currentQuiz.questions.length;

    // Display result
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    document.getElementById('scoreDisplay').textContent = `${score} ${getTranslation('out-of')} ${totalQuestions}`;
    document.getElementById('percentageDisplay').textContent = `${Math.round((score / totalQuestions) * 100)}%`;

    // Show correct answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';

    currentQuiz.questions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correctAnswer;

        const answerElement = document.createElement('div');
        answerElement.className = `answer-item ${isCorrect ? 'correct' : 'incorrect'}`;

        answerElement.innerHTML = `
            <p class="question">${index + 1}. ${question.text}</p>
            <p class="user-answer">${getTranslation('your-answer')} ${userAnswers[index] !== null ? question.options[userAnswers[index]] : getTranslation('not-answered')}</p>
            <p class="correct-answer">${getTranslation('correct-answer')} ${question.options[question.correctAnswer]}</p>
        `;

        answersContainer.appendChild(answerElement);
    });
}

// Function to save the quiz result
function saveResult(event) {
    event.preventDefault();

    const username = document.getElementById('resultUsername').value.trim();
    if (!username) {
        alert(getTranslation('enter-name'));
        return;
    }

    const score = calculateScore();

    // Save result
    DataManager.addResult({
        quizId: currentQuiz.id,
        username: username,
        score: score
    });

    // Reset form
    document.getElementById('resultForm').reset();

    // Show confirmation
    alert(getTranslation('result-saved'));

    // Return to quiz list
    returnToQuizList();
}

// Function to return to the quiz list
function returnToQuizList() {
    // Reset quiz state
    currentQuiz = null;
    currentQuestionIndex = 0;
    userAnswers = [];

    // Show quiz list and hide other sections
    document.getElementById('quizListSection').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';

    // Refresh quiz list
    displayAvailableQuizzes();
}

// Initialize the user interface
document.addEventListener('DOMContentLoaded', function() {
    // Display available quizzes
    displayAvailableQuizzes();

    // Add event listeners to navigation buttons
    const prevButton = document.getElementById('prevButton');
    if (prevButton) {
        prevButton.addEventListener('click', goToPreviousQuestion);
    }

    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', goToNextQuestion);
    }

    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', submitQuiz);
    }

    // Add event listener to the result form
    const resultForm = document.getElementById('resultForm');
    if (resultForm) {
        resultForm.addEventListener('submit', saveResult);
    }

    // Add event listener to the "Try Another Quiz" button
    const tryAnotherButton = document.getElementById('tryAnotherButton');
    if (tryAnotherButton) {
        tryAnotherButton.addEventListener('click', returnToQuizList);
    }

    // Check if there's a stored username for the result form
    const storedUsername = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Pre-fill the username field in the result form if the user is logged in
    if (isLoggedIn && storedUsername) {
        const usernameInput = document.getElementById('resultUsername');
        if (usernameInput) {
            usernameInput.value = storedUsername;
        }
    }
});
