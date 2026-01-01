import { useEffect, useState, useRef } from 'react';

export const ChatWithoutUseEffectEvent: React.FC = () => {
    const [messages, setMessages] = useState<string[]>(['Hello!']);
    const [isNearBottom, setIsNearBottom] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Problem: This effect re-runs whenever isNearBottom changes
        // even though we only care about NEW messages
        if (isNearBottom && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isNearBottom]); // Too many dependencies!

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setIsNearBottom(scrollHeight - scrollTop - clientHeight < 100);
        }
    };

    const addMessage = () => {
        setMessages(prev => [...prev, `Message ${prev.length + 1}`]);
    };

    return (
        <div>
            <h2>Chat (Buggy)</h2>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{ height: 200, overflow: 'auto', border: '1px solid' }}
            >
                {messages.map((msg, i) => <div key={i}>{msg}</div>)}
            </div>
            <button onClick={addMessage}>Send Message</button>
        </div>
    );
};