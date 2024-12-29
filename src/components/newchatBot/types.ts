export interface Message {
  role: 'user' | 'bot';
  content: string;
}

export interface ChatBotProps {
  apiKey: string;
  initialMessage?: string;
  placeholder?: string;
  className?: string;
}