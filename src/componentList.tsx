// List of demo components to show in the right-hand main area
// Key is used for selection; label is shown in the left menu
import { SimpleButtonCounter } from "./components/SimpleButtonCounter.tsx";
import { SimpleKeyboardCounter } from "./components/SimpleKeyboardCounter.tsx";
import type { JSX } from "react";
import { KeyboardCounterDependency } from "./components/KeyboardCounterDependency.tsx";
import { KeyboardCounterRef } from "./components/KeyboardCounterRef.tsx";
import { KeyboardCounterFunctional } from "./components/KeyboardCounterFunctional.tsx";
import { KeyboardCounterEffectEvent } from "./components/KeyboardCounterEffectEvent.tsx";

export type DemoComponentData = {
    label: string;
    element: JSX.Element;
    code?: string;
}
export type DemoKey = keyof typeof demoComponents;

export const demoComponents: Record<string, DemoComponentData> = {
    SimpleButtonCounter: {
        label: 'SimpleButtonCounter',
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
    SimpleKeyboardCounter: {
        label: 'SimpleKeyboardCounter',
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
    KeyboardCounterDependency: {
        label: 'KeyboardCounterDependency',
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
    KeyboardCounterRef: {
        label: 'KeyboardCounterRef',
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
    KeyboardCounterFunctional: {
        label: 'KeyboardCounterFunctional',
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
    }, [count]);
    

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
    KeyboardCounterEffectEvent: {
        label: 'KeyboardCounterEffectEvent',
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
    }
} as const;
