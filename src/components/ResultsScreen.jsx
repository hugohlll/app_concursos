import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuestionRenderer from './QuestionRenderer'; // Importe o novo componente

function ResultsScreen({ userAnswers, onRestart, favoriteIds }) {
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const score = userAnswers.filter(a => a.isCorrect).length;
    const total = userAnswers.length;
    const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0;
    const favoritedInThisQuizCount = userAnswers.filter(a => favoriteIds.has(a.question.id)).length;
    const filteredAnswers = showFavoritesOnly ? userAnswers.filter(a => favoriteIds.has(a.question.id)) : userAnswers;

    return (
        <div id="results-screen">
            <div className="results-header"><h2>Resultados</h2><button onClick={onRestart}>Novo Questionário</button></div>
            <p id="score-text">Você acertou {score} de {total} questões ({percentage}%)</p>
            <button className="secondary" onClick={() => setShowFavoritesOnly(!showFavoritesOnly)} disabled={favoritedInThisQuizCount === 0}>
                {showFavoritesOnly ? `Mostrar Todas (${total})` : `Mostrar Apenas Favoritas (${favoritedInThisQuizCount})`}
            </button>
            <div id="results-summary">
                {filteredAnswers.map((answer, index) => (
                <div key={index} className={`result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="result-item-header">
                        {/* AQUI ESTÁ A MUDANÇA */}
                        <QuestionRenderer question={answer.question} />
                        {favoriteIds.has(answer.question.id) && <span className="favorite-star favorited">★</span>}
                    </div>
                    <p>Sua resposta: {answer.selected !== null ? answer.question.options[answer.selected] : <em>Em branco</em>}</p>
                    {!answer.isCorrect && (<p>Resposta correta: {answer.question.options[answer.correctIndex]}</p>)}
                    <p className="reference">📌 Referência: {answer.question.reference}</p>
                </div>
                ))}
            </div>
        </div>
    );
}

ResultsScreen.propTypes = {
    userAnswers: PropTypes.array.isRequired,
    onRestart: PropTypes.func.isRequired,
    favoriteIds: PropTypes.instanceOf(Set).isRequired,
};

export default ResultsScreen;