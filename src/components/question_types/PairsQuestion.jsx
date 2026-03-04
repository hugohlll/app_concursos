import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdown } from '../../utils.jsx'; // Caminho atualizado

function PairsQuestion({ question }) {
  return (
    <>
      <p className="question-text">
        {parseMarkdown(question.question)}
      </p>
      <div className="question-pairs">
        {question.pairs.map((pair, index) => (
          <div key={index} className="pair-block">
            <h4>{pair.header}</h4>
            <ul>
              {pair.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

PairsQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default PairsQuestion;