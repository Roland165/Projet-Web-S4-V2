document.addEventListener("DOMContentLoaded", () => {
    const leaderboard = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    let results_quiz = sessionStorage.getItem('quizResults');

    if (results_quiz) {
        try {
            results_quiz = JSON.parse(results_quiz);

            if (Array.isArray(results_quiz)) {
                // Sort the results by score (descending) and then by time (ascending)
                results_quiz.sort((a, b) => b.score - a.score || a.time - b.time);

                // Add rankings and display in the table
                results_quiz.forEach((result, index) => {
                    const row = leaderboard.insertRow();
                    row.insertCell(0).innerText = index + 1; // Rank
                    row.insertCell(1).innerText = result.pseudo;
                    row.insertCell(2).innerText = result.score;
                    row.insertCell(3).innerText = result.time;
                });
            } else {
                console.error("Parsed results are not an array.");
            }
        } catch (e) {
            console.error("Failed to parse results_quiz:", e);
        }
    } else {
        console.log("No quiz results found in sessionStorage.");
    }
});
