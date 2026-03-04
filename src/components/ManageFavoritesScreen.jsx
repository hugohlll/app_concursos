import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import QuestionRenderer from './QuestionRenderer'; // Importe o novo componente

function ManageFavoritesScreen({ allQuestions, favoriteIds, onToggleFavorite, onBack }) {
    const favoriteQuestions = useMemo(() => {
        return allQuestions.filter(q => favoriteIds.has(q.id));
    }, [allQuestions, favoriteIds]);

    return(
    <div className="manage-favorites-screen">
        <div className="manage-header">
            <h2>Gerenciar Favoritas ({favoriteIds.size})</h2>
            <button onClick={onBack}>Voltar</button>
        </div>
        <div className="manage-favorites-list">
            {favoriteQuestions.length > 0 ? favoriteQuestions.map(q => (
                <div key={q.id} className="favorite-item">
                    <div className="favorite-item-header">
                        {/* AQUI ESTÁ A MUDANÇA */}
                        <QuestionRenderer question={q} />
                        <button className="danger" onClick={() => onToggleFavorite(q.id)}>Remover</button>
                    </div>
                        <p className="reference">📌 Referência: {q.reference}</p>
                </div>
            )) : <p>Você ainda não marcou nenhuma questão como favorita.</p>}
        </div>
    </div>
    );
}

ManageFavoritesScreen.propTypes = {
    allQuestions: PropTypes.array.isRequired,
    favoriteIds: PropTypes.instanceOf(Set).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ManageFavoritesScreen;