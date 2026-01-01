import '../App.css'
import { useState } from 'react';

let iteration = 0;

type ErrorStatus = {
    isError: boolean;
    message: string;
};

type ProgressHandler = (progress: number) => void;
type ErrorHandler = (message: string) => void;

const runMutation = async (progressHandler: ProgressHandler, errorHandler: ErrorHandler) => {
    const curIteration = ++iteration;
    for (let i = 0; i < 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 250));
        progressHandler(i);
        if (curIteration % 2 === 1 && i === 17) {
            errorHandler(`Oops, something went wrong.`);
            return;
        }
    }
    progressHandler(100);
}

export const ExampleWithServer: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState<ErrorStatus>({ isError: false, message: '' });

    const updateProgress = (progress: number) => {
        if (!error.isError) {
            setCount(progress);
        }
    };

    const handleError = (message: string) => {
        setError({ isError: true, message });
    };

    return (
        <div>
            <div className="card-header">
                <h2>Example with Server</h2>
            </div>
            <p>Count value: {count}</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <button onClick={() => {
                    setError({ isError: false, message: '' });
                    void runMutation(updateProgress, handleError);
                }}>
                    Call Server
                    </button>
            </div>
            <div style={{ marginTop: '1rem', border: '1px dashed #80808080', padding: '1rem' }}>
                <h3>Message:</h3>
                <p>
                    {error.message}
                </p>
            </div>
        </div>
    );
};
