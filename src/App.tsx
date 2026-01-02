import { useMemo, useState } from 'react'
import './App.css'
import { CodeViewer } from "./components/CodeViewer.tsx";
import { demoComponents, type DemoKey } from "./componentList.tsx";
import { SlideNotes } from "./components/SlideNotes.tsx";

function App() {
    const [selected, setSelected] = useState<DemoKey>(demoComponents[0].label as DemoKey);

    const selectedComponent = demoComponents.find(c => c.label === selected)!;
    const code = useMemo(() => selectedComponent.code, [selectedComponent.code]);
    const codeTitle = useMemo(() => `${String(selected)}.tsx`, [selected]);
    const [flipped, setFlipped] = useState(false);

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
                    {demoComponents.map((component) => {
                        const active = selected === component.label;
                        return (
                            <button
                                key={component.label}
                                onClick={() => {
                                    setSelected(component.label as DemoKey);
                                    setFlipped(false);
                                }}
                                style={{
                                    justifyContent: 'left',
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: 8,
                                    border: active ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                    background: active ? '#8da6bf' : '#ffffff',
                                    color: '#111827',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    textAlign: 'left',
                                }}
                            >
                                {component.label}
                            </button>
                        );
                    })}
                </aside>

                {/* Main */}
                <main style={{ flex: 1, padding: 16, boxSizing: 'border-box' }}>
                    <div className="main-split">
                        <div className="preview-pane">
                            <div className="card" style={{ width: '100%', height: '100%', maxWidth: 800, minHeight: 300 }}>
                                {selectedComponent.element}
                            </div>
                            <div style={{ marginTop: 12 }}>
                                <SlideNotes points={selectedComponent.notes} flipped={flipped} onFlip={() => setFlipped(!flipped)}/>
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
