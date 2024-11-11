import type { Message } from "ai/react";

export function ChatMessageBubble(props: { message: Message, aiEmoji?: string, sources: any[] }) {
    const colorClassName =
        props.message.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
    const alignmentClassName =
        props.message.role === "user" ? "ml-auto" : "mr-auto";
    const prefix = props.message.role === "user" ? "🧑" : props.aiEmoji;

    return (
        <div
            className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex break-words`}
        >
            <div className="mr-2">
                {prefix}
            </div>
            <div className="whitespace-pre-wrap flex flex-col max-h-40 overflow-y-auto">
                <span className="break-words">{props.message.content}</span>
                {props.sources && props.sources.length > 0 && (
                    <div className="mt-4">
                        <h2 className="bg-slate-600 px-2 py-1 rounded text-sm text-white">
                            🔍 Sources:
                        </h2>
                        <div className="bg-slate-600 px-2 py-1 rounded text-xs mt-1 overflow-y-auto">
                            {props.sources.map((source, i) => (
                                <div className="mt-2 break-words" key={`source-${i}`}>
                                    {i + 1}. &quot;{source.pageContent}&quot;
                                    {source.metadata?.loc?.lines && (
                                        <div>
                                            <br />
                                            Lines {source.metadata.loc.lines.from} to {source.metadata.loc.lines.to}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
