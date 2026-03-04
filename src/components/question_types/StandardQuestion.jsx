import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdown } from '../../utils.jsx'; // Caminho atualizado

function StandardQuestion({ question }) {
  return (
    <p className="question-text">
      {parseMarkdown(question.question)}
    </p>
  );
}

StandardQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default StandardQuestion;