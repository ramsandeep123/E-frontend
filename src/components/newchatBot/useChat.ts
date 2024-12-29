"use client"
import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from './types';

export const useChat = (apiKey: string, initialMessage: string) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: initialMessage }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(apiKey);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro",systemInstruction:"Your are helpfull assistant emmbed at urbannest which is ecommerce site , if any one ask about your self then you have to told him/her your are develop by urbannest. assist him ans solve their queries.please give short respone"});
      const result = await model.generateContent(content);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'bot', content: text }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Gemini API Error:', errorMessage);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [genAI, isLoading]);

  return {
    messages,
    isLoading,
    sendMessage
  };
};