import '../App.css'
import { useEffect, useState } from 'react';

export const ComplexExample: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const printKey = (key: string) => {
        console.log(key);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            printKey(event.key);
            setCount(prev => prev + 1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    

    return (
        <div>
            <div className="card-header">
                <h2>Keyboard Counter - Functional Update</h2>
            </div>
            <p>Count value: {count}</p>
            <p>Use left/right arrow keys to increment/decrement</p>
        </div>
    );
};
