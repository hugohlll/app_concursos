import React, { useMemo } from 'react';

function SummaryPanel({ settings, topicsMap }) {
    const summary = useMemo(() => {
        let total = 0;
        const byTopic = {};
        const byDifficulty = { 'fácil': 0, 'médio': 0, 'difícil': 0, 'indefinida': 0 };

        for (const topic in settings) {
        byTopic[topic] = 0;
        for (const difficulty in settings[topic]) {
            const count = settings[topic][difficulty] || 0;
            total += count;
            byTopic[topic] += count;
            if (byDifficulty[difficulty] !== undefined) {
            byDifficulty[difficulty] += count;
            }
        }
        }
        return { total, byTopic, byDifficulty };
    }, [settings, topicsMap]);

    return (
        <div className="summary-panel">
        <h3>Resumo da Seleção</h3>
        <p className="total">Total de Questões: {summary.total}</p>
        <h4>Por Tópico:</h4>
        <ul>
            {Object.entries(summary.byTopic).map(([topic, count]) => (
            count > 0 && <li key={topic}><span>{topicsMap[topic]}</span> <span>{count}</span></li>
            ))}
        </ul>
        <h4>Por Dificuldade:</h4>
        <ul>
            {Object.entries(summary.byDifficulty).map(([difficulty, count]) => (
                count > 0 && <li key={difficulty}><span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span> <span>{count}</span></li>
            ))}
        </ul>
        </div>
    );
}

export default SummaryPanel;