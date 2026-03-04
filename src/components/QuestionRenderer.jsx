import React from 'react';
import PropTypes from 'prop-types';
import StandardQuestion from './question_types/StandardQuestion';
import PairsQuestion from './question_types/PairsQuestion';
import ItemsQuestion from './question_types/ItemsQuestion';

function QuestionRenderer({ question }) {
    const renderQuestionType = () => {
        if (question.pairs) {
            return <PairsQuestion question={question} />;
        }
        if (question.items) {
            return <ItemsQuestion question={question} />;
        }
        return <StandardQuestion question={question} />;
    };

    return (
        <div className="question-content">
            {renderQuestionType()}
        </div>
    );
}

QuestionRenderer.propTypes = {
    question: PropTypes.object.isRequired,
};

export default QuestionRenderer;