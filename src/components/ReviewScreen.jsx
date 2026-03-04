import React from 'react';

function ReviewScreen({ answers, onFinishQuiz, onGoToQuestion, favoriteIds }) {
    return (
        <div className="review-screen">
        <div className="review-header">
            <h2>Revisão Final</h2>
            <button onClick={() => {
                const finalAnswers = answers.map(ans => {
                    const correctIndex = ans.question.correct_answer.charCodeAt(0) - 'a'.charCodeAt(0);
                    return { ...ans, isCorrect: ans.selected === correctIndex, correctIndex };
                });
                onFinishQuiz(finalAnswers);
            }}>Entregar Tudo e Ver Resultados</button>
        </div>
        <p>Clique em uma questão para revisá-la. Questões favoritadas possuem uma borda dourada.</p>
        <div className="review-grid">
            {answers.map((ans, index) => (
            <div 
                key={index} 
                className={`progress-dot ${ans.selected !== null ? 'answered' : ''} ${favoriteIds.has(ans.question.id) ? 'favorited' : ''}`}
                onClick={() => onGoToQuestion(index, answers)}
            >{index + 1}</div>
            ))}
        </div>
        </div>
    );
}

export default ReviewScreen;