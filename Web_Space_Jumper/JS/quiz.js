let startTime;

document.addEventListener("DOMContentLoaded", () => {
    startTime = Date.now();
});

function getElapsedTime() {
    const endTime = Date.now();
    return Math.floor((endTime - startTime) / 1000); // temps en secondes
}

async function submitQuiz() {
    const answers = {
        q1: "3",
        q2: "perd une vie",
        q3: ["Niveau 5", "Niveau 10", "Niveau 15"],
        q4: "Il recommence au début du niveau en cours",
        q5: "Il perd la partie",
        q6: "En fonction du niveau en cours et des bonus/malus obtenus",
        q7: "Multiplier la gravité par deux ou inverser la gravité",
        q8: "Le nombre d'obstacles possibles augmente progressivement",
        q9: "4",
        q10: "une semaine avant la date butoir"
    };

    let nb_good_answer = 0;

    for (let i = 1; i <= 10; i++) {
        const question = document.querySelector(`input[name="q${i}"]:checked`);
        if (!question) {
            console.log(`Question ${i} non répondue`);
            continue;
        }
        const answerValue = question.value;
        const correctAnswer = answers[`q${i}`];

        if (Array.isArray(correctAnswer)) {
            const selectedAnswers = Array.from(document.querySelectorAll(`input[name="q${i}"]:checked`)).map(answer => answer.value);
            if (selectedAnswers.length === correctAnswer.length && selectedAnswers.every(answer => correctAnswer.includes(answer))) {
                nb_good_answer++;
            }
        } else {
            if (answerValue === correctAnswer) {
                nb_good_answer++;
            }
        }
    }

    const pseudo = document.querySelector('input[name="pseudo"]').value;
    const elapsedTime = getElapsedTime();

    const result = {
        pseudo: pseudo,
        score: nb_good_answer,
        time: elapsedTime
    };

    saveResult(result);
    alert(`Bravo ${pseudo}, vous avez obtenu ${nb_good_answer}/10 en ${elapsedTime} secondes`);
    resetQuiz();
}

function saveResult(result) {
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    results.push(result);
    let jsonResult = JSON.stringify(results);
    localStorage.setItem('quizResults', jsonResult);
    sessionStorage.setItem('quizResults', jsonResult);
}

function resetQuiz() {
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => input.checked = false);
    document.querySelector('input[name="pseudo"]').value = '';
    startTime = Date.now();
}

document.querySelector('#submit-button').addEventListener('click', submitQuiz);
