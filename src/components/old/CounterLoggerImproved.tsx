import { useEffect, useState } from 'react';

export const CounterLoggerImproved: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const id = setInterval(() => {
            console.log(`Count (improved) is: ${count}`);
        }, 2000);
        return () => clearInterval(id);
    }, [count]); // ⛔ dependency array is empty

    return (
        <div>
            <div className="card-header">
                <h2>Counter Logger (Improved)</h2>
            </div>
            <p>Count value: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};
