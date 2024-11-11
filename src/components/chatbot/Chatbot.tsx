// ChatBubble.tsx
"use client";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
// Ensure ChatWindow is in the same directory or adjust import path

export function ChatBubble() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatWindow = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-end">
            {/* Chat Bubble */}
            <div
                onClick={toggleChatWindow}
                className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer shadow-lg"
            >
                {isOpen ? "✖" : "💬"}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="relative h-[400px] w-[350px]">
                    <ChatWindow
                        endpoint="/api/chat" // replace with your actual API endpoint
                        placeholder="Ask me anything..."
                        titleText="Chat with AI"
                        emoji="🤖"
                        emptyStateComponent={<></>} />
                </div>
            )}
        </div>
    );
}

export default ChatBubble;
