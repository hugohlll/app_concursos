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

// Utilitário seguro para ler JSON do localStorage sem quebrar a aplicação
export function getSafeStorage(key, fallbackValue) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallbackValue;
    } catch (error) {
        console.warn(`[getSafeStorage] Erro ao ler ${key} do localStorage. Resetando valores para prevenir crash.`, error);
        localStorage.removeItem(key);
        return fallbackValue;
    }
}