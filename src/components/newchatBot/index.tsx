"use client"
import React, { useRef, useEffect } from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from './useChat';
import type { ChatBotProps } from './types';

export const ChatBot: React.FC<ChatBotProps> = ({
  apiKey,
  initialMessage = "Hi! I'm your AI assistant. How can I help you today?",
  placeholder = "Type your message here...",
  className = "",
}) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChat(apiKey, initialMessage);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  return (
    <div className={`flex flex-col h-[400px] w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-b from-gray-50 to-white border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center p-4 bg-blue-600 text-white rounded-t-2xl">
        <div className="flex items-center bg-blue-700 rounded-full p-2">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-lg font-semibold ml-3">AI Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 pl-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
};
