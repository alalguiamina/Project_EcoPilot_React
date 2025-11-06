import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandablePanelProps {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "gray";
  metricValue?: number | string;
  metricLabel?: string;
  expandedPanel: string | null;
  setExpandedPanel: (panel: string | null) => void;
  children: ReactNode;
}

export function ExpandablePanel({
  id,
  title,
  description,
  icon,
  color = "gray",
  metricValue,
  metricLabel,
  expandedPanel,
  setExpandedPanel,
  children,
}: ExpandablePanelProps) {
  const isExpanded = expandedPanel === id;

  return (
    <div className="expandable-card">
      <button
        onClick={() => setExpandedPanel(isExpanded ? null : id)}
        className="expandable-header"
      >
        <div className="expandable-title">
          <div className={`icon-container ${color}`}>{icon}</div>
          <div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
          </div>
        </div>
        <div className="expandable-metrics">
          {metricValue !== undefined && (
            <>
              <div className={`metric-value ${color}`}>{metricValue}</div>
              {metricLabel && <p className="metric-label">{metricLabel}</p>}
            </>
          )}
          <span className="expand-icon">
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </button>

      {isExpanded && <div className="expandable-content">{children}</div>}
    </div>
  );
}
export default ExpandablePanel;
