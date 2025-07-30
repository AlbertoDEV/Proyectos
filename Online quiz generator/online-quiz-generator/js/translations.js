// translations.js - Contains translations for the application

// Define available languages
const availableLanguages = ['en', 'es'];

// Store the current language
let currentLanguage = localStorage.getItem('language') || 'en';

// Translations object
const translations = {
    en: {
        // Common
        'app-title': 'Quiz Generator',
        'app-description': 'Test your knowledge with interactive quizzes',
        'copyright': '© 2023 Quiz Generator. All rights reserved.',
        'logout': 'Logout',
        'anonymous-user': 'Anonymous',
        'admin-password-placeholder': 'For admin access, use \'admin123\'',

        // Home page
        'home-title': 'Quiz Generator - Home',
        'welcome': 'Welcome to Quiz Generator',
        'welcome-message': 'Start testing your knowledge with our interactive quizzes!',
        'start-anonymous': 'Start as Anonymous',

        // Login page
        'login-title': 'Quiz Generator - Login',
        'enter-credentials': 'Please enter your credentials to continue',
        'username': 'Username:',
        'password': 'Password:',
        'login-btn': 'Login',
        'note': 'Note:',
        'demo-purposes': 'For demonstration purposes:',
        'admin-access': 'To access as an administrator, use username "admin" and password "admin123"',
        'user-access': 'To access as a regular user, enter any username and leave the password blank or enter any password',

        // User page
        'user-title': 'Quiz Generator - User Interface',
        'available-quizzes': 'Available Quizzes',
        'select-quiz': 'Select a quiz to start:',
        'questions': 'questions',
        'start-quiz': 'Start Quiz',
        'no-quizzes-user': 'No quizzes available. Please check back later.',
        'question': 'Question',
        'of': 'of',
        'previous': 'Previous',
        'next': 'Next',
        'submit-quiz': 'Submit Quiz',
        'unanswered-questions': 'You have {0} unanswered questions. Do you want to submit anyway?',
        'quiz-results': 'Quiz Results',
        'your-score': 'Your score:',
        'percentage': 'Percentage:',
        'out-of': 'out of',
        'your-answer': 'Your answer:',
        'correct-answer': 'Correct answer:',
        'not-answered': 'Not answered',
        'your-name': 'Your Name:',
        'save-result': 'Save Result',
        'try-another': 'Try Another Quiz',
        'enter-name': 'Please enter your name',
        'result-saved': 'Your result has been saved!',

        // Admin page
        'admin-title': 'Quiz Generator - Admin Panel',
        'quiz-management': 'Quiz Management',
        'create-new': 'Create New Quiz',
        'no-quizzes-admin': 'No quizzes available. Create your first quiz!',
        'edit': 'Edit',
        'delete': 'Delete',
        'view-results': 'View Results',
        'delete-confirm': 'Are you sure you want to delete this quiz?',
        'create-edit': 'Create/Edit Quiz',
        'quiz-title': 'Quiz Title:',
        'question-label': 'Question:',
        'options-label': 'Options:',
        'remove-question': 'Remove Question',
        'add-question': 'Add Question',
        'save-quiz': 'Save Quiz',
        'cancel': 'Cancel',
        'enter-title': 'Please enter a quiz title',
        'add-one-question': 'Please add at least one question',
        'enter-question-text': 'Please enter text for all questions',
        'enter-option-text': 'Please enter text for all options',
        'quiz-saved': 'Quiz saved successfully!',
        'quiz-deleted-success': 'Quiz "{0}" deleted successfully!',
        'quiz-deleted-error': 'Error deleting quiz. Please try again.',
        'results-for': 'Results for:',
        'username-header': 'Username',
        'score-header': 'Score',
        'date-header': 'Date',
        'no-results': 'No results available for this quiz',
        'back-to-quizzes': 'Back to Quizzes'
    },
    es: {
        // Common
        'app-title': 'Generador de Cuestionarios',
        'app-description': 'Pon a prueba tus conocimientos con cuestionarios interactivos',
        'copyright': '© 2023 Generador de Cuestionarios. Todos los derechos reservados.',
        'logout': 'Cerrar sesión',
        'anonymous-user': 'Anónimo',
        'admin-password-placeholder': 'Para acceder con el usuario "admin", usa \'admin123\'',

        // Home page
        'home-title': 'Generador de Cuestionarios - Inicio',
        'welcome': 'Bienvenido al Generador de Cuestionarios',
        'welcome-message': '¡Comienza a poner a prueba tus conocimientos con nuestros cuestionarios interactivos!',
        'start-anonymous': 'Comenzar como Anónimo',

        // Login page
        'login-title': 'Generador de Cuestionarios - Iniciar sesión',
        'enter-credentials': 'Por favor, introduce tus credenciales para continuar',
        'username': 'Usuario:',
        'password': 'Contraseña:',
        'login-btn': 'Iniciar sesión',
        'note': 'Nota:',
        'demo-purposes': 'Para fines de demostración:',
        'admin-access': 'Para acceder como administrador, utiliza el nombre de usuario "admin" y la contraseña "admin123"',
        'user-access': 'Para acceder como usuario regular, introduce cualquier nombre de usuario y deja la contraseña en blanco o introduce cualquier contraseña',

        // User page
        'user-title': 'Generador de Cuestionarios - Interfaz de Usuario',
        'available-quizzes': 'Cuestionarios Disponibles',
        'select-quiz': 'Selecciona un cuestionario para comenzar:',
        'questions': 'preguntas',
        'start-quiz': 'Comenzar Cuestionario',
        'no-quizzes-user': 'No hay cuestionarios disponibles. Por favor, vuelve más tarde.',
        'question': 'Pregunta',
        'of': 'de',
        'previous': 'Anterior',
        'next': 'Siguiente',
        'submit-quiz': 'Enviar Cuestionario',
        'unanswered-questions': 'Tienes {0} preguntas sin responder. ¿Quieres enviar de todos modos?',
        'quiz-results': 'Resultados del Cuestionario',
        'your-score': 'Tu puntuación:',
        'percentage': 'Porcentaje:',
        'out-of': 'de',
        'your-answer': 'Tu respuesta:',
        'correct-answer': 'Respuesta correcta:',
        'not-answered': 'Sin responder',
        'your-name': 'Tu Nombre:',
        'save-result': 'Guardar Resultado',
        'try-another': 'Probar Otro Cuestionario',
        'enter-name': 'Por favor, introduce tu nombre',
        'result-saved': '¡Tu resultado ha sido guardado!',

        // Admin page
        'admin-title': 'Generador de Cuestionarios - Panel de Administración',
        'quiz-management': 'Gestión de Cuestionarios',
        'create-new': 'Crear Nuevo Cuestionario',
        'no-quizzes-admin': '¡No hay cuestionarios disponibles. Crea tu primer cuestionario!',
        'edit': 'Editar',
        'delete': 'Eliminar',
        'view-results': 'Ver Resultados',
        'delete-confirm': '¿Estás seguro de que quieres eliminar este cuestionario?',
        'create-edit': 'Crear/Editar Cuestionario',
        'quiz-title': 'Título del Cuestionario:',
        'question-label': 'Pregunta:',
        'options-label': 'Opciones:',
        'remove-question': 'Eliminar Pregunta',
        'add-question': 'Añadir Pregunta',
        'save-quiz': 'Guardar Cuestionario',
        'cancel': 'Cancelar',
        'enter-title': 'Por favor, introduce un título para el cuestionario',
        'add-one-question': 'Por favor, añade al menos una pregunta',
        'enter-question-text': 'Por favor, introduce texto para todas las preguntas',
        'enter-option-text': 'Por favor, introduce texto para todas las opciones',
        'quiz-saved': '¡Cuestionario guardado correctamente!',
        'quiz-deleted-success': '¡Cuestionario "{0}" eliminado correctamente!',
        'quiz-deleted-error': 'Error al eliminar el cuestionario. Por favor, inténtalo de nuevo.',
        'results-for': 'Resultados para:',
        'username-header': 'Usuario',
        'score-header': 'Puntuación',
        'date-header': 'Fecha',
        'no-results': 'No hay resultados disponibles para este cuestionario',
        'back-to-quizzes': 'Volver a Cuestionarios'
    }
};

// Function to get a translation
function getTranslation(key, ...params) {
    const translation = translations[currentLanguage][key] || key;

    // Replace parameters if provided
    if (params.length > 0) {
        return translation.replace(/\{(\d+)\}/g, (match, index) => {
            return params[parseInt(index)] !== undefined ? params[parseInt(index)] : match;
        });
    }

    return translation;
}

// Function to change the language
function changeLanguage(language) {
    if (availableLanguages.includes(language)) {
        currentLanguage = language;
        localStorage.setItem('language', language);
        translatePage();
    }
}

// Function to translate the current page
function translatePage() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            element.textContent = getTranslation(key);
        }
    });

    // Translate elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (key) {
            element.placeholder = getTranslation(key);
        }
    });

    // Translate elements with data-i18n-value attribute
    document.querySelectorAll('[data-i18n-value]').forEach(element => {
        const key = element.getAttribute('data-i18n-value');
        if (key) {
            element.value = getTranslation(key);
        }
    });

    // Update document title
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
        document.title = getTranslation(titleKey);
    }
}

// Initialize translation when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create language switcher if it doesn't exist
    if (!document.getElementById('language-switcher')) {
        // Create language switcher element
        const languageSwitcher = document.createElement('div');
        languageSwitcher.id = 'language-switcher';
        languageSwitcher.className = 'language-switcher';

        const languageSelect = document.createElement('select');
        languageSelect.id = 'language-select';

        availableLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang === 'en' ? 'English' : 'Español';
            option.selected = lang === currentLanguage;
            languageSelect.appendChild(option);
        });

        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });

        languageSwitcher.appendChild(languageSelect);

        // Try to add to user-controls first, if it exists
        const userControls = document.querySelector('.user-controls');
        if (userControls) {
            userControls.insertBefore(languageSwitcher, userControls.firstChild);
        } else {
            // Fallback: add to header
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(languageSwitcher);
            }
        }
    }

    // Translate the page
    translatePage();
});
