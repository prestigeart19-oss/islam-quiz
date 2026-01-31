# 🕌 ISLAM QUIZ - Guide Complet

## 📱 Votre Application est Prête !

Félicitations ! Vous avez créé **ISLAM QUIZ** - une application de quiz islamique avec :
- ✅ 200 niveaux disponibles
- ✅ 50 questions pour commencer (facile à étendre)
- ✅ Chronomètre de 30 secondes par question
- ✅ Système de score intelligent
- ✅ Design moderne (Bleu ciel, Vert, Blanc)
- ✅ Fonctionne hors ligne
- ✅ Installable sur votre téléphone

---

## 📂 Fichiers de Votre Application

Tous ces fichiers sont nécessaires :
1. **index.html** - Page principale
2. **style.css** - Design de l'application
3. **app.js** - Logique du jeu
4. **questions.js** - Base de données des questions
5. **manifest.json** - Configuration PWA
6. **service-worker.js** - Fonctionnement hors ligne
7. **icon-192.png** - Logo 192x192
8. **icon-512.png** - Logo 512x512

---

## 🚀 Comment Installer sur Votre Téléphone

### Option 1 : Via GitHub Pages (RECOMMANDÉ - Gratuit)

#### Étape 1 : Créer un compte GitHub
1. Allez sur https://github.com
2. Cliquez sur "Sign up" (Inscription)
3. Créez votre compte gratuitement

#### Étape 2 : Créer un nouveau dépôt
1. Cliquez sur le "+" en haut à droite
2. Choisissez "New repository"
3. Nom du dépôt : **islam-quiz**
4. Cochez "Public"
5. NE cochez PAS "Add a README file"
6. Cliquez sur "Create repository"

#### Étape 3 : Téléverser les fichiers
1. Cliquez sur "uploading an existing file"
2. Glissez-déposez TOUS les 8 fichiers
3. Ajoutez un message : "Application ISLAM QUIZ"
4. Cliquez sur "Commit changes"

#### Étape 4 : Activer GitHub Pages
1. Allez dans "Settings" (Paramètres)
2. Dans le menu de gauche, cliquez sur "Pages"
3. Sous "Source", sélectionnez "main" (branche)
4. Cliquez sur "Save"
5. Attendez 2-3 minutes
6. Votre site sera disponible à : **https://votre-nom-utilisateur.github.io/islam-quiz**

#### Étape 5 : Installer sur votre téléphone
**Sur Android :**
1. Ouvrez Chrome et allez sur votre site
2. Cliquez sur les 3 points en haut à droite
3. Choisissez "Installer l'application" ou "Ajouter à l'écran d'accueil"
4. L'application apparaîtra sur votre écran d'accueil !

**Sur iPhone :**
1. Ouvrez Safari et allez sur votre site
2. Cliquez sur le bouton "Partager" (icône carré avec flèche)
3. Faites défiler et choisissez "Sur l'écran d'accueil"
4. Cliquez sur "Ajouter"

---

### Option 2 : Via Netlify (Alternative simple)

1. Allez sur https://www.netlify.com
2. Inscrivez-vous gratuitement
3. Cliquez sur "Add new site" > "Deploy manually"
4. Glissez-déposez TOUS les fichiers
5. Votre site sera en ligne en quelques secondes !
6. Suivez les mêmes étapes d'installation que GitHub Pages

---

## 🎮 Comment Jouer

### Écran d'accueil
- **Commencer le niveau** : Lance le niveau actuel
- **Sélectionner un niveau** : Choisissez parmi les 200 niveaux
- **Statistiques** : Voir vos performances globales

### Pendant le jeu
- Vous avez **30 secondes** par question
- Plus vous répondez vite, plus vous gagnez de points :
  - ⚡ 0-10 secondes = 150 points
  - 🔥 11-20 secondes = 125 points
  - ✅ 21-30 secondes = 100 points
- Le chronomètre devient rouge quand il reste 10 secondes

### Progression
- **7+ bonnes réponses** = Niveau débloqué ✅
- **Moins de 7** = Vous pouvez réessayer
- Vos scores sont sauvegardés automatiquement

---

## ➕ Comment Ajouter Vos Propres Questions

### Méthode Simple

1. Ouvrez le fichier **questions.js**
2. À la fin, avant le dernier `];`, ajoutez :

```javascript
{
    question: "Votre question ici ?",
    answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 0  // 0=A, 1=B, 2=C, 3=D
},
```

### Exemple Concret

```javascript
{
    question: "Quelle est la capitale de l'Arabie Saoudite ?",
    answers: ["Riyad", "Djeddah", "La Mecque", "Médine"],
    correct: 0
},
{
    question: "Combien de prières surérogatoires (Sunnah) avant Dhuhr ?",
    answers: ["4", "2", "6", "8"],
    correct: 0
},
```

### Important
- Utilisez toujours **4 réponses**
- L'index commence à **0** (A=0, B=1, C=2, D=3)
- N'oubliez pas la **virgule** après chaque question
- Testez après avoir ajouté 10 nouvelles questions

---

## 🎨 Personnalisation

### Changer les Couleurs

Ouvrez **style.css** et modifiez la section `:root` :

```css
:root {
    --primary-color: #4A90E2;      /* Bleu principal */
    --secondary-color: #50C878;     /* Vert */
    --background: #F0F8FF;          /* Fond clair */
}
```

### Changer le Temps du Chronomètre

Ouvrez **app.js** et cherchez :
```javascript
let timeLeft = 30;  // Changez 30 par le nombre de secondes voulu
```

### Changer le Nombre de Questions par Niveau

Dans **app.js**, cherchez :
```javascript
const endIndex = startIndex + 10;  // Changez 10 par le nombre voulu
```

---

## 🐛 Résolution de Problèmes

### L'application ne s'affiche pas
- Vérifiez que TOUS les fichiers sont dans le même dossier
- Assurez-vous que les noms de fichiers sont exacts (minuscules)
- Videz le cache de votre navigateur

### Les questions ne s'affichent pas
- Vérifiez qu'il n'y a pas d'erreur de syntaxe dans questions.js
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Le chronomètre ne fonctionne pas
- Actualisez la page (F5)
- Vérifiez votre connexion internet lors de la première visite

### Je ne peux pas installer l'app
- Utilisez Chrome (Android) ou Safari (iPhone)
- Assurez-vous que le site est en HTTPS

---

## 📊 Statistiques et Données

L'application sauvegarde automatiquement :
- ✅ Votre niveau actuel
- ✅ Votre score total
- ✅ Les niveaux complétés
- ✅ Vos meilleures performances

### Réinitialiser vos données
Dans l'écran "Statistiques", cliquez sur "Réinitialiser la progression"

---

## 🔄 Mettre à Jour l'Application

### Sur GitHub Pages
1. Allez sur votre dépôt GitHub
2. Cliquez sur le fichier à modifier
3. Cliquez sur l'icône crayon (Edit)
4. Faites vos modifications
5. Cliquez sur "Commit changes"
6. L'application sera mise à jour en 1-2 minutes

---

## 💡 Idées d'Amélioration Future

Vous pouvez ajouter :
- 🏆 Système de badges et récompenses
- 👥 Mode multijoueur
- 🔊 Sons personnalisés
- 🌙 Mode sombre
- 📱 Notifications de rappel
- 🌐 Traduction en plusieurs langues
- 📸 Questions avec images
- 🎯 Mode challenge (1 vie seulement)

---

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :
1. Vérifiez ce guide
2. Regardez les messages d'erreur dans la console (F12)
3. Assurez-vous que tous les fichiers sont présents

---

## 🎉 Félicitations !

Vous avez créé votre première application web ! 

**Prochaines étapes :**
1. ✅ Hébergez l'application sur GitHub Pages
2. ✅ Installez-la sur votre téléphone
3. ✅ Ajoutez vos propres questions
4. ✅ Partagez avec vos amis et votre famille !

**Qu'Allah facilite votre apprentissage !** 🤲

---

## 📝 Crédits

- **Application créée par :** Vous !
- **Logo :** L'ART DE MA FOI
- **Date :** Janvier 2026
