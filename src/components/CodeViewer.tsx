import React, { useMemo } from 'react';

export type CodeViewerProps = {
  title?: string;
  language?: 'tsx' | 'ts' | 'js' | 'jsx' | 'css' | 'txt';
  code: string;
  height?: number | string;
};

function escapeHtml(str: string) {
  return str
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;');
}

function highlightTsLike(input: string): string {
  // Very lightweight, fake highlighter good enough for demo visuals.
  // 1) Escape HTML
  let code = escapeHtml(input);

  // 2) Comments (/* */ and //)
  code = code.replace(/\/\*[\s\S]*?\*\//g, (m) => `<span clazz="tok-comment">${m}</span>`);
  code = code.replace(/(^|\s)(\/\/.*)$/gm, (_m, p1, p2) => `${p1}<span clazz="tok-comment">${p2}</span>`);

  // 3) Strings
  code = code.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, (m) => `<span clazz="tok-ztring">${m}</span>`);

  // 4) Keywords
  const kw = [
    'const','let','var','function','return','import','from','export','default','if','else','switch','case','break','for','while','do','new','class','extends','super','this','try','catch','finally','throw','typeof','instanceof','in','of','as','interface','type','implements','public','private','protected','readonly','enum','namespace','module','declare','any','never','void','unknown','string','number','boolean','React','useState','useMemo'
  ];
  const kwRegex = new RegExp(`\\b(${kw.join('|')})\\b`, 'g');
  code = code.replace(kwRegex, (m) => `<span clazz="tok-kw">${m}</span>`);

  // 5) Numbers
  code = code.replace(/\b(0x[\da-fA-F]+|\d+)(n)?\b/g, (m) => `<span clazz="tok-num">${m}</span>`);

  // 6) Function names (simple heuristic: name followed by paren)
  code = code.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, (m) => `<span clazz="tok-fn">${m}</span>`);

  // 7) JSX tags and attributes (very rough, post-escape so we match &lt; and &gt;)
  // Highlight tag names: &lt;Tag ...&gt; and &lt;/Tag&gt;
  code = code.replace(/(&lt;\/?)([A-Za-z][A-Za-z0-9_]*)/g, (_m, p1, p2) => `${p1}<span clazz="tok-jsx-tag">${p2}</span>`);

  // 8) Since we used clazz instead of class for spans (to avoid identifying them as keywords), fix it now.
  code = code.replace(/clazz/g, 'class');
  code = code.replace(/tok-ztring/g, 'tok-string');

  return code;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ title, language = 'tsx', code, height = '100%' }) => {
  const highlighted = useMemo(() => {
    switch (language) {
      case 'ts':
      case 'tsx':
      case 'js':
      case 'jsx':
        return highlightTsLike(code);
      case 'css':
      default:
        return escapeHtml(code);
    }
  }, [code, language]);

  const lines = useMemo(() => code.split('\n').length, [code]);

  return (
    <div className="code-panel" style={{ height }}>
      <div className="code-header">
        <div className="code-title">{title ?? 'source.tsx'}</div>
        <div className="code-actions">
          <button className="code-action-btn" title="Copy (disabled)">⧉</button>
        </div>
      </div>
      <div className="code-body">
        <div className="code-gutter" aria-hidden>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="gutter-line">{i + 1}</div>
          ))}
        </div>
        <pre className="code-content"><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
      </div>
    </div>
  );
};

export default CodeViewer;
