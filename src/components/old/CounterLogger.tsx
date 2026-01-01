import '../App.css'
import { useState, useEffect } from 'react';

export const CounterLogger: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const id = setInterval(() => {
            console.log(`Count (simple) is: ${count}`);
        }, 2000);
        return () => clearInterval(id);
    }, []); // ⛔ dependency array is empty

    return (
        <div>
            <div className="card-header">
                <h2>Counter Logger (Simple)</h2>
            </div>
            <p>Count value: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};
