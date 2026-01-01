import '../App.css'
import { useState } from 'react';

export const SimpleButtonCounter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const addToCounter = (delta: number) => {
        setCount(count + delta);
    };

    return (
        <div>
            <div className="card-header">
                <h2>Simple Button Counter</h2>
            </div>
            <p>Count value: {count}</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <button onClick={() => addToCounter(-1)}>Decrement</button>
                <button onClick={() => addToCounter(1)}>Increment</button>
            </div>
        </div>
    );
};
