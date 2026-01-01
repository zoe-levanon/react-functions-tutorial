import '../App.css'
import { useEffect, useState } from 'react';

export const SimpleKeyboardCounter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const onKeyDown = (key: string) => {
        if (key === 'ArrowRight') {
            setCount(count + 1);
        } else if (key === 'ArrowLeft') {
            setCount(count - 1);
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
                <h2>Simple Keyboard Counter</h2>
            </div>
            <p>Count value: {count}</p>
            <p>Use left/right arrow keys to increment/decrement</p>
        </div>
    );
};
