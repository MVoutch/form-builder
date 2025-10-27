"use client"

import React, { useState } from 'react';
import { ChatGroq } from '@langchain/groq';
import { HumanMessage } from '@langchain/core/messages';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { FormField } from '@/lib/types/formTypes';

interface AIChatProps {
    onAddField: (field: Omit<FormField, 'id' | 'order'>) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ onAddField }) => {
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        setIsLoading(true);

        try {
            const languageModel = new ChatGroq({
                apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
                model: 'llama-3.3-70b-versatile',
                temperature: 0,
            });

            const outputParser = new JsonOutputParser<Omit<FormField, 'id' | 'order'>>();
            const processingChain = languageModel.pipe(outputParser);

            const aiResponse = await processingChain.invoke([
                new HumanMessage(
                    `Based on the user input: "${userInput}", generate a single form field configuration as JSON.
          The JSON must be: {"type": "text" | "number" | "textarea", "options": {label: string, ... other options based on type}}.
          Respond only with the valid JSON object, no additional text or explanations.`,
                ),
            ]);

            onAddField(aiResponse);
            setUserInput('');
        } catch (error) {
            console.error('AI processing error:', error);
            alert('Error processing request. Check your API key.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 border-t bg-white flex items-center gap-3">
            <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="💡 e.g. Add required phone field"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={isLoading}
            />

            <button
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
            >
                {isLoading ? 'Thinking...' : 'Create'}
            </button>
        </div>
    );
};
