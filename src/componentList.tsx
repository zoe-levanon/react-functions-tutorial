// List of demo components to show in the right-hand main area
// Key is used for selection; label is shown in the left menu
// noinspection JSUnresolvedReference

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
    title: string;
    element: JSX.Element;
    code?: string;
    notes?: string;
}
export type DemoKey = keyof typeof demoComponents;

export const demoComponents: DemoComponentData[] = [
    {
        title: 'Let\'s start with a simple example',
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
        title: 'A version that uses keyboard - we encounter a problem',
        label: 'Simple Keyboard Counter',
        element: <SimpleKeyboardCounter/>,
        notes: 'The first render registers the "keydown" event\nIt closes around the first instance of onKeyDown\nWhen count changes, onKeyDown is rendered again, but handleKeyDown still calls the old value',
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
        title: 'Solution 1 (of 4) - add a dependency',
        label: 'Keyboard Counter Dependency',
        element: <KeyboardCounterDependency/>,
        notes: 'We added a dependency on onKeyDown to ensure that the handleKeyDown function is always up-to-date.\nPro: it works\nCon: we still have a warning\nCon: the event is removed and added every render',
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
    }, [onKeyDown]);
    

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
        title: 'Solution 2 (of 4) - use a functional update',
        label: 'Keyboard Counter Functional',
        element: <KeyboardCounterFunctional/>,
        notes: 'Using the functional update is often the safer option (but might not be our "to-go" option)\nSpecific to our issue of "useState", wouldn\'t have worked with console.log\nUnless we put the console.log inside the function',
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
        title: 'Solution 3 (of 4) - use ref',
        label: 'Keyboard Counter Ref',
        element: <KeyboardCounterRef/>,
        notes: 'This is the \'textbook\' solution\nRefs don\'t re-render, so we need another variable\nWe can\'t just init the ref variable everytime',
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
        title: 'Solution 4 (of 4) - EXPERIMENTAL - useEffectEvent',
        label: 'Keyboard Counter EffectEvent',
        element: <KeyboardCounterEffectEvent/>,
        notes: 'This is experimental (React 19.2 and newer)\nOnly use for non-reactive logic (that needs to see the latest value)\nValues in it shouldn\'t appear in the dependency array',
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
        title: 'A more complex example - no warning in the IDE',
        label: 'Example With Server',
        element: <ExampleWithServer/>,
        notes: 'We call a mutation, with a progressHandler and errorHandler\nWe only update the progress if we\'re not in error\nThe mutation fails on odd runs\nThis fails, but there\'s NO WARNING like we had in the keyboard example',
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
        title: 'A more complex example - fixed using ref',
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
