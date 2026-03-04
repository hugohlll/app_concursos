import React, { useState, useEffect, useCallback } from 'react';
import DisciplineSelectionScreen from './components/DisciplineSelectionScreen';
import SettingsScreen from './components/SettingsScreen';
import QuizScreen from './components/QuizScreen';
import ReviewScreen from './components/ReviewScreen';
import ResultsScreen from './components/ResultsScreen';
import ManageFavoritesScreen from './components/ManageFavoritesScreen';

function App() {
  const [disciplineCategories, setDisciplineCategories] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameState, setGameState] = useState('discipline_selection');
  const [quizSession, setQuizSession] = useState({ questions: [], answers: [] });
  const [initialQuizIndex, setInitialQuizIndex] = useState(0);
  
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // Carrega a lista de disciplinas disponíveis no início
  useEffect(() => {
    fetch('/disciplinas.json')
      .then(res => res.ok ? res.json() : Promise.reject('Falha ao carregar lista de disciplinas.'))
      .then(data => setDisciplineCategories(data))
      .catch(err => setError(err.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  // Carrega as questões da disciplina selecionada
  useEffect(() => {
    if (!selectedDiscipline) return;
    setIsLoading(true);
    fetch(selectedDiscipline.questionFile)
      .then(res => res.ok ? res.json() : Promise.reject(`Falha ao carregar questões para ${selectedDiscipline.title}.`))
      .then(data => setAllQuestions(data))
      .catch(err => setError(err.toString()))
      .finally(() => setIsLoading(false));
  }, [selectedDiscipline]);

  // Carrega/Salva favoritos específicos da disciplina
  useEffect(() => {
    if (selectedDiscipline) {
      const savedFavorites = JSON.parse(localStorage.getItem(`quizFavorites_${selectedDiscipline.id}`)) || [];
      setFavoriteIds(new Set(savedFavorites));
    }
  }, [selectedDiscipline]);

  useEffect(() => {
    if (selectedDiscipline) {
      localStorage.setItem(`quizFavorites_${selectedDiscipline.id}`, JSON.stringify(Array.from(favoriteIds)));
    }
  }, [favoriteIds, selectedDiscipline]);

  const handleSelectDiscipline = (discipline) => {
    setSelectedDiscipline(discipline);
    setGameState('settings');
  };

  const handleBackToDisciplines = () => {
    setSelectedDiscipline(null);
    setAllQuestions([]);
    setGameState('discipline_selection');
  };

  const handleToggleFavorite = useCallback((questionId) => {
    setFavoriteIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(questionId)) newIds.delete(questionId);
      else newIds.add(questionId);
      return newIds;
    });
  }, []);

  const handleStartQuiz = useCallback((questions) => {
    setQuizSession({ 
      questions: questions, 
      answers: questions.map(q => ({ question: q, selected: null })) 
    });
    setInitialQuizIndex(0);
    setGameState('quiz');
  }, []);

  const handleGoToReview = useCallback((answers) => {
    setQuizSession(prev => ({ ...prev, answers }));
    setGameState('review');
  }, []);
  
  const handleGoToQuestionFromReview = useCallback((index, currentAnswers) => {
    setQuizSession(prev => ({ ...prev, answers: currentAnswers }));
    setInitialQuizIndex(index);
    setGameState('quiz');
  }, []);

  const handleFinishQuiz = useCallback((finalAnswers) => {
    setQuizSession(prev => ({ ...prev, answers: finalAnswers }));
    setGameState('results');
  }, []);
  
  const handleRestart = useCallback(() => setGameState('settings'), []);
  const handleGoToManageFavorites = useCallback(() => setGameState('manage_favorites'), []);

  const renderContent = () => {
    if (isLoading && !selectedDiscipline) return <p>Carregando disciplinas...</p>;
    if (error) return <p className="error-message">Erro: {error}</p>;

    switch(gameState) {
      case 'settings':
        if (isLoading) return <p>Carregando questões da disciplina...</p>;
        return <SettingsScreen 
                  discipline={selectedDiscipline}
                  allQuestions={allQuestions} 
                  onStartQuiz={handleStartQuiz} 
                  onGoToManageFavorites={handleGoToManageFavorites}
                  favoriteIds={favoriteIds}
                  onBack={handleBackToDisciplines}
                  />;
      case 'quiz': 
        return <QuizScreen 
                  quizQuestions={quizSession.questions} 
                  initialAnswers={quizSession.answers}
                  initialIndex={initialQuizIndex}
                  onGoToReview={handleGoToReview}
                  favoriteIds={favoriteIds}
                  onToggleFavorite={handleToggleFavorite}
                  />;
      case 'review': 
        return <ReviewScreen 
                  answers={quizSession.answers} 
                  onFinishQuiz={handleFinishQuiz} 
                  onGoToQuestion={handleGoToQuestionFromReview} 
                  favoriteIds={favoriteIds}
                  />;
      case 'results': 
        return <ResultsScreen userAnswers={quizSession.answers} onRestart={handleRestart} favoriteIds={favoriteIds} />;
      case 'manage_favorites':
          return <ManageFavoritesScreen 
                    allQuestions={allQuestions}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={handleToggleFavorite}
                    onBack={handleRestart}
                    />;
      default: 
        return <DisciplineSelectionScreen disciplineCategories={disciplineCategories} onSelectDiscipline={handleSelectDiscipline} />;
    }
  };

  return (
    <div className="container">
      {/* --- MUDANÇA AQUI --- */}
      <h1>
        Questionário Interativo
        {selectedDiscipline ? `: ${selectedDiscipline.title}` : ''}
      </h1>
      {renderContent()}
    </div>
  );
}

export default App;
