import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start space-x-3 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        {/* Message Bubble */}
        <div
          className={`p-3 text-sm rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {message.content}
        </div>

        {/* Avatar */}
        <div
          className={`rounded-full p-2 ${
            isUser ? 'bg-gray-100' : 'bg-blue-50'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-gray-600" />
          ) : (
            <Bot className="w-5 h-5 text-blue-600" />
          )}
        </div>
      </div>
    </div>
  );
};
