import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdown } from '../../utils.jsx';

function ItemsQuestion({ question }) {
  // Desestruturação explícita das propriedades para maior clareza e segurança.
  // Se uma propriedade não existir no objeto 'question', ela será uma string vazia ou um array vazio.
  const {
    question: mainQuestionText = '',
    items = [],
    closing_statement: closingStatementText = ''
  } = question;

  // INSTRUÇÃO DE DEPURAÇÃO:
  // Verifique no console do seu navegador (F12) se este log aparece.
  // Ele deve mostrar o texto da pergunta final que o componente recebeu.
  console.log("ItemsQuestion recebeu o closing_statement:", closingStatementText);

  return (
    <>
      {/* 1. Renderiza o enunciado inicial */}
      <p className="question-text">
        {parseMarkdown(mainQuestionText)}
      </p>

      {/* 2. Renderiza a lista de assertivas */}
      <div className="question-items-list">
        <ul>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{parseMarkdown(item)}</li>
          ))}
        </ul>
      </div>

      {/* 3. Renderiza a pergunta final (closing_statement) */}
      {closingStatementText && (
        <p className="question-text closing-statement">
          {parseMarkdown(closingStatementText)}
        </p>
      )}
    </>
  );
}

ItemsQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default ItemsQuestion;
