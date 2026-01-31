// Module de gestion de l'IA vocale
class VoiceAI {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.recognition = null;
        this.isListening = false;
        this.isSpeaking = false;
        this.voiceEnabled = false;
        this.initRecognition();
    }
    
    initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'fr-FR';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                this.handleVoiceInput(transcript);
            };
            
            this.recognition.onerror = (event) => {
                console.log('Erreur reconnaissance vocale:', event.error);
                this.stopListening();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateMicButton();
            };
        }
    }
    
    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const btn = document.getElementById('toggle-voice-btn');
        const icon = btn.querySelector('.voice-icon');
        
        if (this.voiceEnabled) {
            btn.classList.add('active');
            icon.textContent = '🔊';
            this.speak('Assistant vocal activé ! Je vais vous accompagner pendant le quiz.');
        } else {
            btn.classList.remove('active');
            icon.textContent = '🔇';
            this.stopSpeaking();
            this.stopListening();
        }
        localStorage.setItem('voiceEnabled', this.voiceEnabled);
    }
    
    speak(text, options = {}) {
        if (!this.voiceEnabled) return;
        return new Promise((resolve) => {
            this.stopSpeaking();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'fr-FR';
            utterance.rate = options.rate || 1.0;
            utterance.pitch = options.pitch || 1.0;
            utterance.volume = options.volume || 1.0;
            
            const voices = this.synthesis.getVoices();
            const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
            if (frenchVoice) utterance.voice = frenchVoice;
            
            utterance.onstart = () => {
                this.isSpeaking = true;
                this.showSpeakingIndicator(text);
            };
            utterance.onend = () => {
                this.isSpeaking = false;
                this.hideSpeakingIndicator();
                resolve();
            };
            utterance.onerror = () => {
                this.isSpeaking = false;
                this.hideSpeakingIndicator();
                resolve();
            };
            this.synthesis.speak(utterance);
        });
    }
    
    stopSpeaking() {
        if (this.synthesis.speaking) this.synthesis.cancel();
        this.isSpeaking = false;
        this.hideSpeakingIndicator();
    }
    
    startListening() {
        if (!this.recognition || !this.voiceEnabled || this.isListening) return;
        try {
            this.recognition.start();
            this.isListening = true;
            this.updateMicButton();
        } catch (e) {
            console.log('Erreur démarrage écoute:', e);
        }
    }
    
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateMicButton();
        }
    }
    
    updateMicButton() {
        const btn = document.getElementById('mic-btn');
        if (!btn) return;
        if (this.isListening) {
            btn.classList.add('listening');
            btn.innerHTML = '<span class="mic-icon">🎤</span> Écoute...';
        } else {
            btn.classList.remove('listening');
            btn.innerHTML = '<span class="mic-icon">🎤</span> Répondre vocalement';
        }
    }
    
    handleVoiceInput(transcript) {
        const gameScreen = document.getElementById('game-screen');
        if (!gameScreen.classList.contains('active')) return;
        const answersButtons = document.querySelectorAll('.answer-btn:not(.disabled)');
        
        for (let i = 0; i < answersButtons.length; i++) {
            const answerText = answersButtons[i].textContent.toLowerCase();
            if (transcript.includes(answerText) || this.similarity(transcript, answerText) > 0.6) {
                answersButtons[i].click();
                return;
            }
        }
        
        const numbers = ['un', 'deux', 'trois', 'quatre', '1', '2', '3', '4'];
        for (let i = 0; i < 4; i++) {
            if (transcript.includes(numbers[i]) || transcript.includes(numbers[i + 4])) {
                if (answersButtons[i]) {
                    answersButtons[i].click();
                    return;
                }
            }
        }
        this.speak('Désolé, je n\'ai pas compris. Cliquez sur votre choix.');
    }
    
    similarity(s1, s2) {
        let longer = s1.length > s2.length ? s1 : s2;
        let shorter = s1.length > s2.length ? s2 : s1;
        const longerLength = longer.length;
        if (longerLength === 0) return 1.0;
        return (longerLength - this.editDistance(longer, shorter)) / longerLength;
    }
    
    editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) costs[j] = j;
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
    
    showSpeakingIndicator(text) {
        const indicator = document.getElementById('speaking-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
            indicator.querySelector('.speaking-text').textContent = text;
        }
    }
    
    hideSpeakingIndicator() {
        const indicator = document.getElementById('speaking-indicator');
        if (indicator) indicator.style.display = 'none';
    }
    
    async greetUser() {
        const greetings = [
            'Assalam alaykoum ! Bienvenue dans Islam Quiz !',
            'Bonjour ! Prêt à tester vos connaissances islamiques ?',
            'Salam ! Je suis là pour vous accompagner !'
        ];
        await this.speak(greetings[Math.floor(Math.random() * greetings.length)]);
    }
    
    async announceLevel(level) {
        await this.speak(`Niveau ${level}. Bonne chance !`);
    }
    
    async readQuestion(questionText) {
        await this.speak(questionText);
        if (this.recognition) {
            setTimeout(() => {
                this.speak('Vous pouvez répondre en cliquant ou en parlant.');
            }, 500);
        }
    }
    
    async commentAnswer(isCorrect, timeSpent) {
        if (isCorrect) {
            const messages = [
                timeSpent <= 10 ? 'Excellent ! Très rapide !' : 'Bravo ! Bonne réponse !',
                timeSpent <= 10 ? 'Incroyable ! Vous êtes rapide !' : 'Très bien ! C\'est exact !'
            ];
            await this.speak(messages[Math.floor(Math.random() * messages.length)]);
        } else {
            const messages = ['Ce n\'est pas grave, continuez !', 'Pas de souci, la prochaine sera la bonne !'];
            await this.speak(messages[Math.floor(Math.random() * messages.length)]);
        }
    }
    
    async announceResult(correctAnswers, totalQuestions, score) {
        const percentage = (correctAnswers / totalQuestions) * 100;
        let message = '';
        if (percentage >= 90) message = `Fantastique ! ${correctAnswers} bonnes réponses. Score : ${score} points.`;
        else if (percentage >= 70) message = `Excellent ! ${correctAnswers} bonnes réponses. Score : ${score} points.`;
        else if (percentage >= 50) message = `Pas mal ! ${correctAnswers} bonnes réponses. Score : ${score} points.`;
        else message = `${correctAnswers} bonnes réponses. Ne vous découragez pas ! Score : ${score} points.`;
        await this.speak(message);
    }
    
    loadPreferences() {
        const saved = localStorage.getItem('voiceEnabled');
        if (saved === 'true') {
            this.voiceEnabled = true;
            const btn = document.getElementById('toggle-voice-btn');
            if (btn) {
                btn.classList.add('active');
                btn.querySelector('.voice-icon').textContent = '🔊';
            }
        }
    }
}

const voiceAI = new VoiceAI();
