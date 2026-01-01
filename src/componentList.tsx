// List of demo components to show in the right-hand main area
// Key is used for selection; label is shown in the left menu
import { SimpleButtonCounter } from "./components/SimpleButtonCounter.tsx";
import { SimpleKeyboardCounter } from "./components/SimpleKeyboardCounter.tsx";
import type { JSX } from "react";
import { KeyboardCounterDependency } from "./components/KeyboardCounterDependency.tsx";
import { KeyboardCounterRef } from "./components/KeyboardCounterRef.tsx";
import { KeyboardCounterFunctional } from "./components/KeyboardCounterFunctional.tsx";
import { KeyboardCounterEffectEvent } from "./components/KeyboardCounterEffectEvent.tsx";
import { ExampleWithServer } from "./components/ExampleWithServer.tsx";
import { ExampleWithServerFixed } from "./components/ExampleWithServerFixed.tsx";

export type DemoComponentData = {
    label: string;
    element: JSX.Element;
    code?: string;
}
export type DemoKey = keyof typeof demoComponents;

export const demoComponents: DemoComponentData[] = [
    {
        label: 'Simple Button Counter',
        element: <SimpleButtonCounter/>,
        code: `import '../App.css'
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
};`
    },
    {
        label: 'Simple Keyboard Counter',
        element: <SimpleKeyboardCounter/>,
        code: `import '../App.css'
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
};`
    },
    {
        label: 'Keyboard Counter Dependency',
        element: <KeyboardCounterDependency/>,
        code: `import '../App.css'
import { useEffect, useState } from 'react';

export const KeyboardCounterDependency: React.FC = () => {
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
    }, [count]);
    

    return (
        <div>
            <div className="card-header">
                <h2>Keyboard Counter - Dependency</h2>
            </div>
            <p>Count value: {count}</p>
            <p>Use left/right arrow keys to increment/decrement</p>
        </div>
    );
};`
    },
    {
        label: 'Keyboard Counter Functional',
        element: <KeyboardCounterFunctional/>,
        code: `import '../App.css'
import { useEffect, useState } from 'react';

export const KeyboardCounterFunctional: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const onKeyDown = (key: string) => {
        if (key === 'ArrowRight') {
            setCount(prev => prev + 1);
        } else if (key === 'ArrowLeft') {
            setCount(prev => prev - 1);
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
                <h2>Keyboard Counter - Functional Update</h2>
            </div>
            <p>Count value: {count}</p>
            <p>Use left/right arrow keys to increment/decrement</p>
        </div>
    );
};`
    },
    {
        label: 'Keyboard Counter Ref',
        element: <KeyboardCounterRef/>,
        code: `import '../App.css'
import { useEffect, useRef, useState } from 'react';

export const KeyboardCounterRef: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const counterRef = useRef(count);

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
};`
    },
    {
        label: 'Keyboard Counter EffectEvent',
        element: <KeyboardCounterEffectEvent/>,
        code: `import '../App.css'
import { useEffect, useEffectEvent, useState } from 'react';

export const KeyboardCounterEffectEvent: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const onKeyDown = useEffectEvent((key: string) => {
        if (key === 'ArrowRight') {
            setCount(count + 1);
        } else if (key === 'ArrowLeft') {
            setCount(count - 1);
        }
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            onKeyDown(event.key);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });
    

    return (
        <div>
            <div className="card-header">
                <h2>Keyboard Counter - useEffectEvent</h2>
            </div>
            <p>Count value: {count}</p>
            <p>Use left/right arrow keys to increment/decrement</p>
        </div>
    );
};`
    },
    {
        label: 'Example With Server',
        element: <ExampleWithServer/>,
        code: `import { useState } from 'react';

type ErrorStatus = {
    isError: boolean;
    message: string;
};
type ProgressHandler = (progress: number) => void;
type ErrorHandler = (message: string) => void;

const runMutation = async (progressHandler: ProgressHandler, errorHandler: ErrorHandler) => {
    ...
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
            ...
                <button onClick={() => {
                    setError({ isError: false, message: '' });
                    void runMutation(updateProgress, handleError);
                }}>Call Server</button>
            ...
    );
};`
    },
    {
        label: 'Example With Server Fixed',
        element: <ExampleWithServerFixed/>,
        code: `import { useEffect, useRef, useState } from 'react';

type ErrorStatus = {
    isError: boolean;
    message: string;
};
type ProgressHandler = (progress: number) => void;
type ErrorHandler = (message: string) => void;

const runMutation = async (progressHandler: ProgressHandler, errorHandler: ErrorHandler) => {
    ...
}

export const ExampleWithServerFixed: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState<ErrorStatus>({ isError: false, message: '' });
    const errorRef = useRef<ErrorStatus>(error);

    useEffect(() => {
        errorRef.current = error;
    }, [error])


    const updateProgress = (progress: number) => {
        if (!errorRef.current.isError) {
            setCount(progress);
        }
    };

    const handleError = (message: string) => {
        setError({ isError: true, message });
    };

    return (
        ...
                <button onClick={() => {
                    setError({ isError: false, message: '' });
                    void runMutation(updateProgress, handleError);
                }}>Call Server</button>
        ...
    );
};`
    }
] as const;
