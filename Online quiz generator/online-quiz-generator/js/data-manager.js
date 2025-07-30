// data-manager.js - Centralized functions for interacting with localStorage

const DataManager = {
    // Quiz related functions

    // Get all quizzes from localStorage
    getQuizzes: function() {
        const quizzes = localStorage.getItem('quizzes');
        return quizzes ? JSON.parse(quizzes) : [];
    },

    // Save quizzes to localStorage
    saveQuizzes: function(quizzes) {
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
    },

    // Get a specific quiz by ID
    getQuizById: function(quizId) {
        const quizzes = this.getQuizzes();
        return quizzes.find(quiz => quiz.id === quizId) || null;
    },

    // Add a new quiz
    addQuiz: function(quiz) {
        const quizzes = this.getQuizzes();
        // Generate a unique ID
        quiz.id = Date.now().toString();
        quizzes.push(quiz);
        this.saveQuizzes(quizzes);
        return quiz;
    },

    // Update an existing quiz
    updateQuiz: function(updatedQuiz) {
        const quizzes = this.getQuizzes();
        const index = quizzes.findIndex(quiz => quiz.id === updatedQuiz.id);

        if (index !== -1) {
            quizzes[index] = updatedQuiz;
            this.saveQuizzes(quizzes);
            return true;
        }
        return false;
    },

    // Delete a quiz and its associated results
    deleteQuiz: function(quizId) {
        // Delete the quiz
        const quizzes = this.getQuizzes();
        const filteredQuizzes = quizzes.filter(quiz => quiz.id !== quizId);

        if (filteredQuizzes.length < quizzes.length) {
            this.saveQuizzes(filteredQuizzes);

            // Also delete any results associated with this quiz
            const results = this.getResults();
            const filteredResults = results.filter(result => result.quizId !== quizId);
            this.saveResults(filteredResults);

            return true;
        }
        return false;
    },

    // Results related functions

    // Get all results from localStorage
    getResults: function() {
        const results = localStorage.getItem('results');
        return results ? JSON.parse(results) : [];
    },

    // Save results to localStorage
    saveResults: function(results) {
        localStorage.setItem('results', JSON.stringify(results));
    },

    // Get results for a specific quiz
    getResultsByQuizId: function(quizId) {
        const results = this.getResults();
        return results.filter(result => result.quizId === quizId);
    },

    // Add a new result
    addResult: function(result) {
        const results = this.getResults();
        // Add timestamp
        result.date = new Date().toISOString();
        results.push(result);
        this.saveResults(results);
        return result;
    },

    // Initialize sample data (for demo purposes)
    initializeSampleData: function() {
        // Check if data already exists
        if (this.getQuizzes().length === 0) {
            // Sample quizzes
            const sampleQuizzes = [
                {
                    id: '1',
                    title: 'Basic JavaScript Quiz',
                    questions: [
                        {
                            type: 'multiple-choice',
                            text: 'What is JavaScript?',
                            options: [
                                'A programming language',
                                'A markup language',
                                'A styling language',
                                'A database'
                            ],
                            correctAnswer: 0
                        },
                        {
                            type: 'multiple-choice',
                            text: 'Which of the following is NOT a JavaScript data type?',
                            options: [
                                'String',
                                'Boolean',
                                'Float',
                                'Object'
                            ],
                            correctAnswer: 2
                        },
                        {
                            type: 'multiple-choice',
                            text: 'What does DOM stand for?',
                            options: [
                                'Document Object Model',
                                'Data Object Model',
                                'Document Oriented Model',
                                'Digital Ordinance Model'
                            ],
                            correctAnswer: 0
                        }
                    ]
                },
                {
                    id: '2',
                    title: 'HTML Basics',
                    questions: [
                        {
                            type: 'multiple-choice',
                            text: 'What does HTML stand for?',
                            options: [
                                'Hyper Text Markup Language',
                                'High Tech Modern Language',
                                'Hyper Transfer Markup Language',
                                'Home Tool Markup Language'
                            ],
                            correctAnswer: 0
                        },
                        {
                            type: 'multiple-choice',
                            text: 'Which tag is used to create a hyperlink?',
                            options: [
                                '<link>',
                                '<a>',
                                '<href>',
                                '<url>'
                            ],
                            correctAnswer: 1
                        }
                    ]
                }
            ];

            this.saveQuizzes(sampleQuizzes);

            // Sample results
            const sampleResults = [
                {
                    quizId: '1',
                    username: 'John',
                    score: 2,
                    date: '2023-01-01T12:00:00.000Z'
                },
                {
                    quizId: '1',
                    username: 'Jane',
                    score: 3,
                    date: '2023-01-02T14:30:00.000Z'
                },
                {
                    quizId: '2',
                    username: 'John',
                    score: 1,
                    date: '2023-01-03T10:15:00.000Z'
                }
            ];

            this.saveResults(sampleResults);
        }
    }
};

// Initialize sample data when the application loads
document.addEventListener('DOMContentLoaded', function() {
    DataManager.initializeSampleData();
});
