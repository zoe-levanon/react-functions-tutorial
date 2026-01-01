import { useState } from 'react';

export const CountAndMessage: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [message, setMessage] = useState<string>("The count is now " + count);

    const handleClick = () => {
        setCount(count + 1);
        setMessage(`The count is now: ${count}`);
    }
    return (
        <div>
            <div className="card-header">
                <h2>Counter and Message</h2>
            </div>
            <p>{message}</p>
            <button onClick={handleClick}>Increment</button>
            <p style={{ fontFamily: "courier", marginTop: "3rem" }}>Count value: {count}</p>
        </div>
    );
};
