// Base de données des questions
const questions = [
    // Niveau 1 - Questions sur le Coran
    {
        question: "Combien de sourates contient le Coran ?",
        answers: ["114", "100", "99", "120"],
        correct: 0
    },
    {
        question: "Quelle est la première sourate révélée au Prophète Muhammad (saw) ?",
        answers: ["Al-Fatiha", "Al-Alaq", "Al-Ikhlas", "Al-Nas"],
        correct: 1
    },
    {
        question: "Combien de fois le mot 'Allah' apparaît-il dans le Coran ?",
        answers: ["2699", "2500", "3000", "2698"],
        correct: 0
    },
    {
        question: "Quelle sourate est appelée 'le cœur du Coran' ?",
        answers: ["Al-Baqara", "Ya-Sin", "Al-Kahf", "Al-Mulk"],
        correct: 1
    },
    {
        question: "Combien d'années a duré la révélation du Coran ?",
        answers: ["23 ans", "20 ans", "25 ans", "30 ans"],
        correct: 0
    },
    {
        question: "Quelle sourate ne commence pas par 'Bismillah' ?",
        answers: ["At-Tawbah", "Al-Fatiha", "Al-Baqara", "Al-Ikhlas"],
        correct: 0
    },
    {
        question: "Quelle est la plus longue sourate du Coran ?",
        answers: ["Al-Baqara", "Al-Imran", "An-Nisa", "Al-Maidah"],
        correct: 0
    },
    {
        question: "Quelle est la plus courte sourate du Coran ?",
        answers: ["Al-Kawthar", "Al-Asr", "Al-Ikhlas", "An-Nasr"],
        correct: 0
    },
    {
        question: "Combien de prophètes sont mentionnés dans le Coran ?",
        answers: ["25", "20", "30", "35"],
        correct: 0
    },
    {
        question: "Quelle sourate parle des gens de la caverne ?",
        answers: ["Al-Kahf", "Al-Anfal", "At-Tawbah", "Yunus"],
        correct: 0
    },

    // Niveau 2 - Questions sur les Prophètes
    {
        question: "Qui est le premier prophète envoyé par Allah ?",
        answers: ["Adam (as)", "Nouh (as)", "Ibrahim (as)", "Musa (as)"],
        correct: 0
    },
    {
        question: "Quel prophète a construit l'arche ?",
        answers: ["Nouh (as)", "Ibrahim (as)", "Yusuf (as)", "Musa (as)"],
        correct: 0
    },
    {
        question: "Qui est considéré comme l'ami d'Allah (Khalilullah) ?",
        answers: ["Ibrahim (as)", "Musa (as)", "Isa (as)", "Muhammad (saw)"],
        correct: 0
    },
    {
        question: "Quel prophète pouvait parler aux animaux ?",
        answers: ["Sulayman (as)", "Dawud (as)", "Yusuf (as)", "Musa (as)"],
        correct: 0
    },
    {
        question: "Quel prophète a été avalé par un poisson ?",
        answers: ["Yunus (as)", "Musa (as)", "Isa (as)", "Harun (as)"],
        correct: 0
    },
    {
        question: "Qui est le père du Prophète Yusuf (as) ?",
        answers: ["Ya'qub (as)", "Ibrahim (as)", "Ishaq (as)", "Ismail (as)"],
        correct: 0
    },
    {
        question: "Quel prophète a reçu les Psaumes (Zabur) ?",
        answers: ["Dawud (as)", "Musa (as)", "Isa (as)", "Sulayman (as)"],
        correct: 0
    },
    {
        question: "Qui est le dernier prophète envoyé par Allah ?",
        answers: ["Muhammad (saw)", "Isa (as)", "Musa (as)", "Ibrahim (as)"],
        correct: 0
    },
    {
        question: "Quel prophète a été jeté dans le feu mais n'a pas brûlé ?",
        answers: ["Ibrahim (as)", "Musa (as)", "Isa (as)", "Lut (as)"],
        correct: 0
    },
    {
        question: "Quel prophète a fendu la mer en deux ?",
        answers: ["Musa (as)", "Isa (as)", "Yunus (as)", "Harun (as)"],
        correct: 0
    },

    // Niveau 3 - Questions sur les Piliers de l'Islam
    {
        question: "Combien y a-t-il de piliers de l'Islam ?",
        answers: ["5", "6", "4", "7"],
        correct: 0
    },
    {
        question: "Quel est le premier pilier de l'Islam ?",
        answers: ["La Shahada", "La Salat", "La Zakat", "Le Hajj"],
        correct: 0
    },
    {
        question: "Combien de prières obligatoires y a-t-il par jour ?",
        answers: ["5", "3", "7", "4"],
        correct: 0
    },
    {
        question: "Durant quel mois les musulmans jeûnent-ils ?",
        answers: ["Ramadan", "Shawwal", "Dhul Hijjah", "Muharram"],
        correct: 0
    },
    {
        question: "Quelle est la direction de la prière ?",
        answers: ["La Kaaba à La Mecque", "Jérusalem", "Médine", "Le Nord"],
        correct: 0
    },
    {
        question: "À quel pourcentage correspond la Zakat ?",
        answers: ["2,5%", "5%", "10%", "1%"],
        correct: 0
    },
    {
        question: "Combien de fois faut-il faire le Hajj dans sa vie (si possible) ?",
        answers: ["1 fois", "2 fois", "3 fois", "Chaque année"],
        correct: 0
    },
    {
        question: "Quelle prière vient après Fajr ?",
        answers: ["Dhuhr", "Asr", "Maghrib", "Isha"],
        correct: 0
    },
    {
        question: "Combien de Rakat contient la prière de Fajr ?",
        answers: ["2", "4", "3", "1"],
        correct: 0
    },
    {
        question: "Quel est le mois du pèlerinage (Hajj) ?",
        answers: ["Dhul Hijjah", "Ramadan", "Shawwal", "Rajab"],
        correct: 0
    },

    // Niveau 4 - Questions sur l'Histoire Islamique
    {
        question: "En quelle année le Prophète Muhammad (saw) est-il né ?",
        answers: ["570", "610", "622", "632"],
        correct: 0
    },
    {
        question: "Quel événement marque le début du calendrier islamique ?",
        answers: ["L'Hégire", "La naissance du Prophète", "La révélation", "La conquête de La Mecque"],
        correct: 0
    },
    {
        question: "Quelle est la première mosquée construite en Islam ?",
        answers: ["Quba", "Al-Masjid al-Haram", "Al-Masjid an-Nabawi", "Al-Aqsa"],
        correct: 0
    },
    {
        question: "Qui était le premier calife après le Prophète Muhammad (saw) ?",
        answers: ["Abu Bakr (ra)", "Umar (ra)", "Uthman (ra)", "Ali (ra)"],
        correct: 0
    },
    {
        question: "Quelle bataille est appelée 'la Victoire Décisive' ?",
        answers: ["Badr", "Uhud", "Khandaq", "Hunayn"],
        correct: 0
    },
    {
        question: "Qui était la première épouse du Prophète Muhammad (saw) ?",
        answers: ["Khadija (ra)", "Aisha (ra)", "Hafsa (ra)", "Fatima (ra)"],
        correct: 0
    },
    {
        question: "En quelle année le Prophète (saw) est-il décédé ?",
        answers: ["632", "622", "610", "640"],
        correct: 0
    },
    {
        question: "Quelle ville est appelée 'La Ville du Prophète' ?",
        answers: ["Médine", "La Mecque", "Jérusalem", "Damas"],
        correct: 0
    },
    {
        question: "Combien de fois le Prophète (saw) a-t-il effectué le Hajj ?",
        answers: ["1 fois", "2 fois", "3 fois", "4 fois"],
        correct: 0
    },
    {
        question: "Qui a compilé le Coran en un seul livre ?",
        answers: ["Uthman (ra)", "Abu Bakr (ra)", "Umar (ra)", "Ali (ra)"],
        correct: 0
    },

    // Niveau 5 - Questions sur la Foi (Iman)
    {
        question: "Combien y a-t-il de piliers de la foi (Iman) ?",
        answers: ["6", "5", "7", "4"],
        correct: 0
    },
    {
        question: "Quel est le premier pilier de la foi ?",
        answers: ["Croire en Allah", "Croire aux anges", "Croire aux prophètes", "Croire au Coran"],
        correct: 0
    },
    {
        question: "Combien de livres révélés sont mentionnés dans le Coran ?",
        answers: ["4", "3", "5", "6"],
        correct: 0
    },
    {
        question: "Quel ange est chargé de transmettre la révélation ?",
        answers: ["Jibril (as)", "Mikail (as)", "Israfil (as)", "Azrail (as)"],
        correct: 0
    },
    {
        question: "Quel ange est chargé de la pluie et de la subsistance ?",
        answers: ["Mikail (as)", "Jibril (as)", "Israfil (as)", "Azrail (as)"],
        correct: 0
    },
    {
        question: "Comment s'appelle le Jour du Jugement Dernier en arabe ?",
        answers: ["Yawm al-Qiyamah", "Yawm al-Jumu'ah", "Yawm al-Arafah", "Yawm al-Ashura"],
        correct: 0
    },
    {
        question: "Qu'est-ce que le Qadr ?",
        answers: ["Le destin", "La prière", "Le jeûne", "L'aumône"],
        correct: 0
    },
    {
        question: "Quel livre a été révélé au Prophète Musa (as) ?",
        answers: ["La Torah", "L'Injil", "Le Zabur", "Le Coran"],
        correct: 0
    },
    {
        question: "Quel livre a été révélé au Prophète Isa (as) ?",
        answers: ["L'Injil", "La Torah", "Le Zabur", "Le Coran"],
        correct: 0
    },
    {
        question: "Quel ange sonnera la trompette le Jour du Jugement ?",
        answers: ["Israfil (as)", "Jibril (as)", "Mikail (as)", "Azrail (as)"],
        correct: 0
    }
];

// Note: Pour ajouter plus de questions, continuez simplement à ajouter des objets
// dans le même format que ci-dessus.
// Exemple pour ajouter une nouvelle question :
/*
{
    question: "Votre question ici ?",
    answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 0  // L'index de la bonne réponse (0 = A, 1 = B, 2 = C, 3 = D)
}
*/
