import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { CodeViewer } from "./components/CodeViewer.tsx";
import { demoComponents } from "./componentList.tsx";
import { SlideNotes } from "./components/SlideNotes.tsx";

function App() {
    const [selected, setSelected] = useState<string>(demoComponents[0].label);

    const selectedComponent = demoComponents.find(c => c.label === selected)!;
    const codeTitle = useMemo(() => `${String(selected)}.tsx`, [selected]);
    const [flipped, setFlipped] = useState(false);
    const [constMode, setConstMode] = useState(false);
    const [titlePulse, setTitlePulse] = useState(false);
    const code = useMemo(() => {
        const rawCode = selectedComponent.code!;
        return constMode && selected === "Simple Keyboard Counter"
            ? rawCode.replace(/\(count/g,"(0")
            : rawCode;
    }, [selectedComponent.code, constMode, selected]);

    useEffect(() => {
        // Trigger a brief pulse when the selected component changes
        const id = window.setTimeout(() => setTitlePulse(true), 0);
        const clearId = window.setTimeout(() => setTitlePulse(false), 1300);
        return () => {
            window.clearTimeout(id);
            window.clearTimeout(clearId);
        };
    }, [selected]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ width: '100%', display: 'flex', marginLeft: "1rem", marginBottom: 0, marginTop: 0, alignItems: "center", justifyContent: "space-between" }}>
                <h2 className={titlePulse ? 'title-pulse' : undefined} style={{ margin: 0, fontSize: "30px" }}>{selectedComponent.title}</h2>
                <div style={{
                    backgroundColor: '#72ae72',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '32px'
                }}>
                    <h4 style={{ margin: 0 }}>You Can't Avoid Closure...</h4>
                </div>
            </div>
            <div style={{ display: 'flex', flex: 1, minHeight: 0, width: '100%', minWidth: 0 }}>
                {/* Sidebar */}
                <aside
                    style={{
                        width: 400,
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
                    <div>
                    {demoComponents.map((component) => {
                        const active = selected === component.label;
                        return (
                            <button
                                key={component.label}
                                onClick={() => {
                                    setSelected(component.label);
                                    setFlipped(false);
                                }}
                                style={{
                                    justifyContent: 'left',
                                    marginBottom: 8,
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
                    </div>
                </aside>
                <div style={{ position: "absolute", bottom: "2rem", left: "1rem" }}>
                    <label className="toggle-switch">
                        <input type="checkbox" onChange={() => setConstMode(!constMode)} checked={constMode}/>
                        <span className="slider">Toggle const value</span>
                    </label>
                </div>

                {/* Main */}
                <main style={{ flex: '1 1 auto', padding: 16, boxSizing: 'border-box', width: '100%', minWidth: 0 }}>
                <div className="main-split">
                        <div className="preview-pane">
                            <div className="card">
                                {selectedComponent.element}
                            </div>
                            <SlideNotes points={selectedComponent.notes} flipped={flipped} onFlip={() => setFlipped(!flipped)}/>
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
