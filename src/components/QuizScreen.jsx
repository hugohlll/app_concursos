import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuestionRenderer from './QuestionRenderer'; // Importe o novo componente

function QuizScreen({ quizQuestions, onGoToReview, initialAnswers, initialIndex = 0, favoriteIds, onToggleFavorite }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [answers, setAnswers] = useState(initialAnswers);
    
    const currentAnswer = answers[currentIndex];
    if (!currentAnswer) {
        return <p>Erro ao carregar a questão. Por favor, reinicie.</p>;
    }

    const handleSelectAnswer = (selectedIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex].selected = selectedIndex;
        setAnswers(newAnswers);
    };
    
    const isLastQuestion = currentIndex === quizQuestions.length - 1;

    return (
        <div id="quiz-screen" style={{paddingBottom: '80px'}}>
            <div className="progress-bar">
                {answers.map((ans, index) => (
                    <div 
                        key={index} 
                        className={`progress-dot ${ans.selected !== null ? 'answered' : ''} ${index === currentIndex ? 'current' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    >{index + 1}</div>
                ))}
            </div>
            <div className="quiz-header">
                <h3>Questão {currentIndex + 1} de {quizQuestions.length}</h3>
                <span 
                    className={`favorite-star ${favoriteIds.has(currentAnswer.question.id) ? 'favorited' : ''}`} 
                    onClick={() => onToggleFavorite(currentAnswer.question.id)}
                    title="Marcar como favorita"
                >★</span>
            </div>

            {/* AQUI ESTÁ A MUDANÇA */}
            <QuestionRenderer question={currentAnswer.question} />

            <div className="answer-options">
              {currentAnswer.question.options.map((option, index) => (
                <div key={index} className={`option ${currentAnswer.selected === index ? 'selected' : ''}`} onClick={() => handleSelectAnswer(index)}>
                  <input type="radio" name={`q${currentIndex}`} checked={currentAnswer.selected === index} readOnly />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <div className="quiz-nav">
                <button onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>Anterior</button>
                <button onClick={() => isLastQuestion ? onGoToReview(answers) : setCurrentIndex(i => i + 1)}>
                    {isLastQuestion ? 'Ir para Revisão' : 'Próxima'}
                </button>
            </div>
        </div>
    );
}

QuizScreen.propTypes = {
    quizQuestions: PropTypes.array.isRequired,
    onGoToReview: PropTypes.func.isRequired,
    initialAnswers: PropTypes.array.isRequired,
    initialIndex: PropTypes.number,
    favoriteIds: PropTypes.instanceOf(Set).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};

export default QuizScreen;