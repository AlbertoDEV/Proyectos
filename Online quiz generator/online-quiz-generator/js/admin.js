// admin.js - Admin functionality for quiz management

// Global variables
let currentEditingQuizId = null;

// Function to display all quizzes in the admin panel
function displayQuizzes() {
    const quizzes = DataManager.getQuizzes();
    const quizListContainer = document.getElementById('quizList');

    if (!quizListContainer) return;

    quizListContainer.innerHTML = '';

    if (quizzes.length === 0) {
        quizListContainer.innerHTML = `<p>${getTranslation('no-quizzes-admin')}</p>`;
        return;
    }

    quizzes.forEach(quiz => {
        const quizElement = document.createElement('div');
        quizElement.className = 'quiz-item';
        quizElement.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.questions.length} ${getTranslation('questions')}</p>
            <div class="quiz-actions">
                <button class="edit-btn btn secondary-btn" data-id="${quiz.id}">${getTranslation('edit')}</button>
                <button class="delete-btn btn danger-btn" data-id="${quiz.id}">${getTranslation('delete')}</button>
                <button class="view-results-btn btn primary-btn" data-id="${quiz.id}">${getTranslation('view-results')}</button>
            </div>
        `;

        quizListContainer.appendChild(quizElement);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            loadQuizForEditing(quizId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            const quiz = DataManager.getQuizById(quizId);
            if (!quiz) return;

            if (confirm(getTranslation('delete-confirm'))) {
                const result = DataManager.deleteQuiz(quizId);
                if (result) {
                    // Show success message
                    alert(getTranslation('quiz-deleted-success', quiz.title));
                    displayQuizzes();
                } else {
                    // Show error message
                    alert(getTranslation('quiz-deleted-error'));
                }
            }
        });
    });

    document.querySelectorAll('.view-results-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.getAttribute('data-id');
            displayQuizResults(quizId);
        });
    });
}

// Function to load a quiz for editing
function loadQuizForEditing(quizId) {
    const quiz = DataManager.getQuizById(quizId);
    if (!quiz) return;

    currentEditingQuizId = quizId;

    // Set quiz title
    document.getElementById('quizTitle').value = quiz.title;

    // Clear existing questions
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    // Add each question
    quiz.questions.forEach((question, index) => {
        addQuestionForm(question, index);
    });

    // Show the quiz form section
    document.getElementById('quizFormSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';

    // Scroll to the form
    document.getElementById('quizFormSection').scrollIntoView({ behavior: 'smooth' });
}

// Function to add a new question form
function addQuestionForm(question = null, index = null) {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionId = index !== null ? index : document.querySelectorAll('.question-form').length;

    const questionForm = document.createElement('div');
    questionForm.className = 'question-form';
    questionForm.dataset.questionId = questionId;

    // Default values for a new question
    const questionText = question ? question.text : '';
    const options = question ? question.options : ['', '', '', ''];
    const correctAnswer = question ? question.correctAnswer : 0;

    // Create the question form HTML
    questionForm.innerHTML = `
        <div class="form-group">
            <label for="questionText_${questionId}">${getTranslation('question-label')}</label>
            <input type="text" id="questionText_${questionId}" class="question-text" value="${questionText}" required>
        </div>
        <div class="options-container">
            <h4>${getTranslation('options-label')}</h4>
            ${options.map((option, i) => `
                <div class="option-group">
                    <input type="radio" name="correctOption_${questionId}" value="${i}" ${i === correctAnswer ? 'checked' : ''}>
                    <input type="text" class="option-text" data-option="${i}" value="${option}" required>
                </div>
            `).join('')}
        </div>
        <button type="button" class="remove-question-btn">${getTranslation('remove-question')}</button>
        <hr>
    `;

    questionsContainer.appendChild(questionForm);

    // Add event listener to remove button
    questionForm.querySelector('.remove-question-btn').addEventListener('click', function() {
        questionForm.remove();
    });
}

// Function to save a quiz
function saveQuiz(event) {
    event.preventDefault();

    const quizTitle = document.getElementById('quizTitle').value.trim();
    if (!quizTitle) {
        alert(getTranslation('enter-title'));
        return;
    }

    const questionForms = document.querySelectorAll('.question-form');
    if (questionForms.length === 0) {
        alert(getTranslation('add-one-question'));
        return;
    }

    // Collect questions data
    const questions = [];

    for (const questionForm of questionForms) {
        const questionId = questionForm.dataset.questionId;
        const questionText = questionForm.querySelector('.question-text').value.trim();

        if (!questionText) {
            alert(getTranslation('enter-question-text'));
            return;
        }

        const options = [];
        const optionInputs = questionForm.querySelectorAll('.option-text');

        for (const optionInput of optionInputs) {
            const optionText = optionInput.value.trim();
            if (!optionText) {
                alert(getTranslation('enter-option-text'));
                return;
            }
            options.push(optionText);
        }

        const correctAnswer = parseInt(questionForm.querySelector('input[name="correctOption_' + questionId + '"]:checked').value);

        questions.push({
            type: 'multiple-choice',
            text: questionText,
            options: options,
            correctAnswer: correctAnswer
        });
    }

    // Create or update the quiz
    const quiz = {
        title: quizTitle,
        questions: questions
    };

    if (currentEditingQuizId) {
        quiz.id = currentEditingQuizId;
        DataManager.updateQuiz(quiz);
        currentEditingQuizId = null;
    } else {
        DataManager.addQuiz(quiz);
    }

    // Reset the form
    document.getElementById('quizForm').reset();
    document.getElementById('questionsContainer').innerHTML = '';

    // Update the quiz list
    displayQuizzes();

    // Hide the form section
    document.getElementById('quizFormSection').style.display = 'none';

    alert(getTranslation('quiz-saved'));
}

// Function to display quiz results
function displayQuizResults(quizId) {
    const quiz = DataManager.getQuizById(quizId);
    const results = DataManager.getResultsByQuizId(quizId);

    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    document.getElementById('quizFormSection').style.display = 'none';

    const resultsTitle = document.getElementById('resultsTitle');
    const resultsTable = document.getElementById('resultsTable');

    resultsTitle.textContent = `${getTranslation('results-for')} ${quiz.title}`;

    // Clear previous results
    resultsTable.innerHTML = `
        <tr>
            <th>${getTranslation('username-header')}</th>
            <th>${getTranslation('score-header')}</th>
            <th>${getTranslation('date-header')}</th>
        </tr>
    `;

    if (results.length === 0) {
        resultsTable.innerHTML += `
            <tr>
                <td colspan="3">${getTranslation('no-results')}</td>
            </tr>
        `;
        return;
    }

    // Sort results by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Add results to the table
    results.forEach(result => {
        const date = new Date(result.date).toLocaleString();
        resultsTable.innerHTML += `
            <tr>
                <td>${result.username}</td>
                <td>${result.score} / ${quiz.questions.length}</td>
                <td>${date}</td>
            </tr>
        `;
    });

    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Display quizzes
    displayQuizzes();

    // Add event listener to the "Add Question" button
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', function() {
            addQuestionForm();
        });
    }

    // Add event listener to the quiz form
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', saveQuiz);
    }

    // Add event listener to the "New Quiz" button
    const newQuizBtn = document.getElementById('newQuizBtn');
    if (newQuizBtn) {
        newQuizBtn.addEventListener('click', function() {
            currentEditingQuizId = null;
            document.getElementById('quizForm').reset();
            document.getElementById('questionsContainer').innerHTML = '';
            document.getElementById('quizFormSection').style.display = 'block';
            document.getElementById('resultsSection').style.display = 'none';
        });
    }

    // Add event listener to the "Back to Quizzes" button
    const backToQuizzesBtn = document.getElementById('backToQuizzesBtn');
    if (backToQuizzesBtn) {
        backToQuizzesBtn.addEventListener('click', function() {
            document.getElementById('resultsSection').style.display = 'none';
        });
    }

    // Add event listener to the "Cancel" button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            document.getElementById('quizForm').reset();
            document.getElementById('questionsContainer').innerHTML = '';
            document.getElementById('quizFormSection').style.display = 'none';
            currentEditingQuizId = null;
        });
    }
});
