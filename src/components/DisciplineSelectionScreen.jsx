import React from 'react';
import PropTypes from 'prop-types';

function DisciplineSelectionScreen({ disciplineCategories, onSelectDiscipline }) {
  return (
    <div className="discipline-selection-screen">
      {disciplineCategories.map((category) => (
        <section key={category.categoryTitle} className="discipline-category">
          {/* Usa o categoryTitle diretamente, garantindo acentuação correta */}
          <h2>{category.categoryTitle}</h2>
          <div className="discipline-grid">
            {category.disciplines.map((discipline) => (
              <div 
                key={discipline.id} 
                className="discipline-card" 
                onClick={() => onSelectDiscipline(discipline)}
              >
                <h3>{discipline.title}</h3>
                <p>{discipline.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

DisciplineSelectionScreen.propTypes = {
  disciplineCategories: PropTypes.array.isRequired,
  onSelectDiscipline: PropTypes.func.isRequired,
};

export default DisciplineSelectionScreen;
