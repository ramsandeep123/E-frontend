"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Message } from 'ai';
import { useChat } from "ai/react";
import { useRef, useState, ReactElement } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "./ChatMessageBubble";
import { UploadDocumentsForm } from "./UploadDocumentsForm";
import { IntermediateStep } from "./IntermediateStep";

export function ChatWindow(props: {
    endpoint: string,
    emptyStateComponent: ReactElement,
    placeholder?: string,
    titleText?: string,
    emoji?: string;
    showIngestForm?: boolean,
    showIntermediateStepsToggle?: boolean
}) {
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const { endpoint, emptyStateComponent, placeholder, titleText = "An LLM", showIngestForm, showIntermediateStepsToggle, emoji } = props;

    const [showIntermediateSteps, setShowIntermediateSteps] = useState(false);
    const [intermediateStepsLoading, setIntermediateStepsLoading] = useState(false);
    const ingestForm = showIngestForm && <UploadDocumentsForm></UploadDocumentsForm>;
    const intemediateStepsToggle = showIntermediateStepsToggle && (
        <div>
            <input type="checkbox" id="show_intermediate_steps" name="show_intermediate_steps" checked={showIntermediateSteps} onChange={(e) => setShowIntermediateSteps(e.target.checked)}></input>
            <label htmlFor="show_intermediate_steps"> Show intermediate steps</label>
        </div>
    );

    const [sourcesForMessages, setSourcesForMessages] = useState<Record<string, any>>({});

    const { messages, input, setInput, handleInputChange, handleSubmit, isLoading: chatEndpointIsLoading, setMessages } =
        useChat({
            api: endpoint,
            onResponse(response) {
                const sourcesHeader = response.headers.get("x-sources");
                const sources = sourcesHeader ? JSON.parse((Buffer.from(sourcesHeader, 'base64')).toString('utf8')) : [];
                const messageIndexHeader = response.headers.get("x-message-index");
                if (sources.length && messageIndexHeader !== null) {
                    setSourcesForMessages({ ...sourcesForMessages, [messageIndexHeader]: sources });
                }
            },
            streamMode: "text",
            onError: (e) => {
                toast(e.message, {
                    theme: "dark"
                });
            }
        });

    async function sendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (messageContainerRef.current) {
            messageContainerRef.current.classList.add("grow");
        }
        if (!messages.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        if (chatEndpointIsLoading ?? intermediateStepsLoading) {
            return;
        }
        if (!showIntermediateSteps) {
            handleSubmit(e);
        } else {
            setIntermediateStepsLoading(true);
            setInput("");
            const messagesWithUserReply = messages.concat({ id: messages.length.toString(), content: input, role: "user" });
            setMessages(messagesWithUserReply);
            const response = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify({
                    messages: messagesWithUserReply,
                    show_intermediate_steps: true
                })
            });
            const json = await response.json();
            setIntermediateStepsLoading(false);
            if (response.status === 200) {
                const responseMessages: Message[] = json.messages;
                const toolCallMessages = responseMessages.filter((responseMessage: Message) => {
                    return (responseMessage.role === "assistant" && !!responseMessage.tool_calls?.length) || responseMessage.role === "tool";
                });
                const intermediateStepMessages = [];
                for (let i = 0; i < toolCallMessages.length; i += 2) {
                    const aiMessage = toolCallMessages[i];
                    const toolMessage = toolCallMessages[i + 1];
                    intermediateStepMessages.push({
                        id: (messagesWithUserReply.length + (i / 2)).toString(),
                        role: "system" as const,
                        content: JSON.stringify({
                            action: aiMessage.tool_calls?.[0],
                            observation: toolMessage.content,
                        })
                    });
                }
                const newMessages = messagesWithUserReply;
                for (const message of intermediateStepMessages) {
                    newMessages.push(message);
                    setMessages([...newMessages]);
                    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
                }
                setMessages([
                    ...newMessages,
                    {
                        id: (newMessages.length).toString(),
                        content: responseMessages[responseMessages.length - 1].content,
                        role: "assistant"
                    },
                ]);
            } else {
                if (json.error) {
                    toast(json.error, {
                        theme: "dark"
                    });
                    throw new Error(json.error);
                }
            }
        }
    }

    return (
        <div
            className="fixed bottom-4 right-4 h-[400px] w-[350px] p-4 rounded-lg bg-gray-800 shadow-lg flex flex-col items-center"
        >
            <h2 className="text-2xl text-white">{emoji} {titleText}</h2>
            {messages.length === 0 ? emptyStateComponent : ""}
            <div
                className="flex flex-col w-full overflow-y-auto mt-4 mb-2 p-2 bg-gray-700 rounded-md"
                ref={messageContainerRef}
            >
                {messages.length > 0 ? (
                    messages.map((m, i) => {
                        const sourceKey = i.toString();
                        return (
                            m.role === "system"
                                ? <IntermediateStep key={m.id} message={m}></IntermediateStep>
                                : <ChatMessageBubble key={m.id} message={m} aiEmoji={emoji} sources={sourcesForMessages[sourceKey]}></ChatMessageBubble>
                        );
                    })
                ) : (
                    <p className="text-gray-400 text-center">No messages yet</p>
                )}
            </div>

            {messages.length === 0 && ingestForm}

            <form onSubmit={sendMessage} className="w-full">
                <div className="flex w-full mb-2">
                    {intemediateStepsToggle}
                </div>
                <div className="flex w-full  ">
                    <input
                        className="flex-grow p-2 mr-2 rounded-md bg-gray-600 text-white placeholder-gray-400"
                        value={input}
                        placeholder={placeholder ?? "Ask any thing"}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">
                        {chatEndpointIsLoading || intermediateStepsLoading ? "Thinking.." : "Send"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
