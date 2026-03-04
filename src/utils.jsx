// /src/utils.jsx
import React from 'react';

// Adicione esta função se ela não existir
export function parseMarkdown(text = "") {
    if (!text) return text;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
        return index % 2 === 1 ? <b key={index}>{part}</b> : part;
    });
}

// Mantenha a função parseTags que já existe
export function parseTags(tagsString = "") {
    const parts = tagsString.split(',').map(s => s.trim());
    let difficulty = parts.pop()?.toLowerCase() || 'indefinida';
    return { topic: parts.join(', ') || 'Sem Tópico', difficulty };
}