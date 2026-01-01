import { useMemo, useState } from 'react'
import './App.css'
import { CodeViewer } from "./components/CodeViewer.tsx";
import { demoComponents, type DemoKey } from "./componentList.tsx";

function App() {
    const [selected, setSelected] = useState<DemoKey>('SimpleButtonCounter');

    const SelectedComponent = useMemo(() => demoComponents[selected].element, [selected]);
    const code = useMemo(() => demoComponents[selected].code, [selected]);
    const codeTitle = useMemo(() => `${selected}.tsx`, [selected]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '8px 0', margin: 0 }}>
                <h1 style={{ margin: 0 }}>React Functions Session</h1>
            </div>

            {/* Content: Sidebar + Main */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                {/* Sidebar */}
                <aside
                    style={{
                        width: 360,
                        maxHeight: 'calc(100vh - 100px)',
                        borderRight: '1px solid #e5e7eb',
                        padding: 16,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Components</div>
                    {Object.keys(demoComponents).map((key) => {
                        const k = key as DemoKey;
                        const active = selected === k;
                        return (
                            <button
                                key={k}
                                onClick={() => setSelected(k)}
                                style={{
                                    textAlign: 'left',
                                    padding: '10px 12px',
                                    borderRadius: 8,
                                    border: active ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                    background: active ? '#dbeafe' : '#ffffff',
                                    color: '#111827',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                {demoComponents[k].label}
                            </button>
                        );
                    })}
                </aside>

                {/* Main */}
                <main style={{ flex: 1, padding: 16, boxSizing: 'border-box' }}>
                    <div className="main-split">
                        <div className="preview-pane">
                            <div className="card" style={{ width: '100%', height: '100%', maxWidth: 800, minHeight: 300 }}>
                                {SelectedComponent}
                            </div>
                        </div>
                        <div className="code-pane">
                            <CodeViewer title={codeTitle} language="tsx" code={code || ""} height={"100%"}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App
