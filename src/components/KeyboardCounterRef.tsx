import '../App.css'
import { useEffect, useRef, useState } from 'react';

export const KeyboardCounterRef: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const counterRef = useRef(count);
    // counterRef.current = count;

    useEffect(() => {
        counterRef.current = count;
    }, [count]);

    const onKeyDown = (key: string) => {
        if (key === 'ArrowRight') {
            setCount(counterRef.current + 1);
        } else if (key === 'ArrowLeft') {
            setCount(counterRef.current - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            onKeyDown(event.key);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    

    return (
        <div>
            <div className="card-header">
                <h2>Keyboard Counter - Ref</h2>
            </div>
            <p>Count value: {count}</p>
            <p>Use left/right arrow keys to increment/decrement</p>
        </div>
    );
};
