import React, { useMemo } from "react";

export type SlideNotesProps = {
  // Accept either an array of strings or a single string separated by new lines
  points?: string[] | string;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
  flipped: boolean;
  onFlip: () => void;
};

export const SlideNotes: React.FC<SlideNotesProps> = ({ points, title = "Notes", style, className, onFlip, flipped }) => {


  const items = useMemo(() => {
    if (!points) return [];
    if (Array.isArray(points)) return points.filter(Boolean);
    return String(points)
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [points]);

  if (!items.length) return null;

  return (
    <div
      className={["slide-notes", className].filter(Boolean).join(" ")}
      style={style}
      onClick={onFlip}
      role="button"
      aria-label={`${title} card`}
    >
      <div className={"flip-card" + (flipped ? " flipped" : "")}> 
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="notes-front">
              <div className="notes-badge">{title}</div>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="notes-back">
              <div className="notes-title">{title}</div>
              <ul className="notes-list">
                {items.map((p, i) => (
                  <li key={i} className="notes-item">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="notes-footer">Click anywhere to flip</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideNotes;
