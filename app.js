// Variables globales
let currentLevel = 1;
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let timer = null;
let timeLeft = 30;
let levelQuestions = [];
let questionTimes = [];
let gameData = {
    currentLevel: 1,
    totalScore: 0,
    completedLevels: [],
    levelScores: {},
    totalCorrect: 0,
    totalQuestions: 0
};

// Charger les données sauvegardées
function loadGameData() {
    const saved = localStorage.getItem('islamQuizData');
    if (saved) {
        gameData = JSON.parse(saved);
        currentLevel = gameData.currentLevel;
    }
    updateHomeScreen();
}

// Sauvegarder les données
function saveGameData() {
    localStorage.setItem('islamQuizData', JSON.stringify(gameData));
}

// Mettre à jour l'écran d'accueil
function updateHomeScreen() {
    document.getElementById('current-level').textContent = gameData.currentLevel;
    document.getElementById('total-score').textContent = gameData.totalScore;
    document.getElementById('progress-text').textContent = `${gameData.completedLevels.length}/200`;
}

// Afficher un écran
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Retour à l'accueil
function showHome() {
    showScreen('home-screen');
    updateHomeScreen();
}

// Démarrer un niveau
function startLevel(levelNum = currentLevel) {
    currentLevel = levelNum;
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    questionTimes = [];
    
    // Obtenir les questions pour ce niveau
    levelQuestions = getLevelQuestions(currentLevel);
    
    // Afficher l'écran de jeu
    showScreen('game-screen');
    document.getElementById('game-level').textContent = currentLevel;
    document.getElementById('game-score').textContent = score;
    
    // Afficher la première question
    showQuestion();
}

// Obtenir les questions d'un niveau
function getLevelQuestions(level) {
    const startIndex = (level - 1) * 10;
    const endIndex = startIndex + 10;
    
    // Si nous avons des questions pour ce niveau
    if (questions[startIndex]) {
        return questions.slice(startIndex, endIndex);
    }
    
    // Sinon, générer des questions aléatoires depuis le pool disponible
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
}

// Afficher une question
function showQuestion() {
    if (currentQuestion >= levelQuestions.length) {
        endLevel();
        return;
    }
    
    const question = levelQuestions[currentQuestion];
    
    // Mettre à jour l'interface
    document.getElementById('question-num').textContent = currentQuestion + 1;
    document.getElementById('question-text').textContent = question.question;
    
    // Afficher les réponses
    const answersGrid = document.getElementById('answers-grid');
    answersGrid.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index);
        answersGrid.appendChild(btn);
    });
    
    // Mettre à jour la barre de progression
    const progress = ((currentQuestion + 1) / levelQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    
    // Démarrer le chronomètre
    startTimer();
}

// Démarrer le chronomètre
function startTimer() {
    timeLeft = 30;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    timerElement.classList.remove('warning');
    
    const startTime = Date.now();
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            questionTimes.push(timeSpent);
            selectAnswer(-1); // Temps écoulé = mauvaise réponse
        }
    }, 1000);
}

// Sélectionner une réponse
function selectAnswer(selectedIndex) {
    clearInterval(timer);
    
    const question = levelQuestions[currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Enregistrer le temps
    const timeSpent = 30 - timeLeft;
    questionTimes.push(timeSpent);
    
    // Désactiver tous les boutons
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    // Afficher la bonne et la mauvaise réponse
    buttons[question.correct].classList.add('correct');
    
    if (!isCorrect && selectedIndex !== -1) {
        buttons[selectedIndex].classList.add('wrong');
        playSound('wrong');
    } else if (isCorrect) {
        playSound('correct');
        correctAnswers++;
        
        // Calculer les points (plus rapide = plus de points)
        let points = 100;
        if (timeSpent <= 10) points = 150;
        else if (timeSpent <= 20) points = 125;
        
        score += points;
        document.getElementById('game-score').textContent = score;
    }
    
    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 2000);
}

// Jouer un son
function playSound(type) {
    const sound = document.getElementById(type + '-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {}); // Ignorer les erreurs de lecture
    }
}

// Terminer le niveau
function endLevel() {
    clearInterval(timer);
    
    // Calculer les statistiques
    const avgTime = Math.round(questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length);
    
    // Mettre à jour les données de jeu
    gameData.totalScore += score;
    gameData.totalCorrect += correctAnswers;
    gameData.totalQuestions += 10;
    
    if (!gameData.completedLevels.includes(currentLevel)) {
        gameData.completedLevels.push(currentLevel);
    }
    
    gameData.levelScores[currentLevel] = score;
    
    if (correctAnswers >= 7 && currentLevel === gameData.currentLevel) {
        gameData.currentLevel = Math.min(currentLevel + 1, 200);
    }
    
    saveGameData();
    
    // Afficher l'écran de résultat
    showScreen('result-screen');
    
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    if (correctAnswers >= 9) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Parfait !';
        resultMessage.textContent = 'Vous êtes un expert !';
    } else if (correctAnswers >= 7) {
        resultIcon.textContent = '🎉';
        resultTitle.textContent = 'Excellent !';
        resultMessage.textContent = 'Très bonne performance !';
    } else if (correctAnswers >= 5) {
        resultIcon.textContent = '👍';
        resultTitle.textContent = 'Bien joué !';
        resultMessage.textContent = 'Continuez vos efforts !';
    } else {
        resultIcon.textContent = '💪';
        resultTitle.textContent = 'Courage !';
        resultMessage.textContent = 'Vous pouvez faire mieux !';
    }
    
    document.getElementById('correct-answers').textContent = correctAnswers + '/10';
    document.getElementById('level-score').textContent = score;
    document.getElementById('avg-time').textContent = avgTime + 's';
}

// Niveau suivant
function nextLevel() {
    if (currentLevel < 200) {
        startLevel(currentLevel + 1);
    } else {
        showHome();
    }
}

// Refaire le niveau
function retryLevel() {
    startLevel(currentLevel);
}

// Afficher la sélection de niveau
function showLevelSelect() {
    showScreen('level-select-screen');
    
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= 200; i++) {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.textContent = i;
        
        if (gameData.completedLevels.includes(i)) {
            btn.classList.add('completed');
            btn.onclick = () => startLevel(i);
        } else if (i <= gameData.currentLevel) {
            btn.classList.add('unlocked');
            btn.onclick = () => startLevel(i);
        } else {
            btn.classList.add('locked');
        }
        
        grid.appendChild(btn);
    }
}

// Afficher les statistiques
function showStats() {
    showScreen('stats-screen');
    
    document.getElementById('completed-levels').textContent = 
        `${gameData.completedLevels.length}/200`;
    document.getElementById('stats-total-score').textContent = gameData.totalScore;
    document.getElementById('total-correct').textContent = 
        `${gameData.totalCorrect}/${gameData.totalQuestions}`;
    
    const successRate = gameData.totalQuestions > 0 
        ? Math.round((gameData.totalCorrect / gameData.totalQuestions) * 100)
        : 0;
    document.getElementById('success-rate').textContent = successRate + '%';
}

// Réinitialiser la progression
function resetProgress() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toute votre progression ?')) {
        gameData = {
            currentLevel: 1,
            totalScore: 0,
            completedLevels: [],
            levelScores: {},
            totalCorrect: 0,
            totalQuestions: 0
        };
        currentLevel = 1;
        saveGameData();
        showHome();
    }
}

// Initialiser l'application
window.addEventListener('DOMContentLoaded', () => {
    loadGameData();
    
    // Enregistrer le Service Worker pour PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .catch(() => {});
    }
});
