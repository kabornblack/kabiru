import { CSSProperties } from "react";

/**
 * Gold connector lines between the floating code windows. The SVG variants
 * are desktop-only (`lg`); `StackedConnector` stands in for them below `lg`.
 * `className` positions the connector against its parent.
 */
type ConnectorProps = {
  className: string;
  style?: CSSProperties;
} & (
  | {
      /** Straight line with a node at each end, e.g. headline → panel. */
      variant: "horizontal" | "vertical";
      /** Width (horizontal) or height (vertical) in px. */
      length: number;
    }
  | {
      /** Panel → panel elbow off the panel's right or left edge. */
      variant: "elbow-right" | "elbow-left";
    }
);

export default function Connector(props: ConnectorProps) {
  const { className, style } = props;
  const svgClass = `code-connector pointer-events-none hidden lg:block ${className}`;

  if (props.variant === "horizontal") {
    const { length } = props;
    return (
      <svg
        aria-hidden="true"
        className={svgClass}
        style={style}
        width={length}
        height="8"
        viewBox={`0 0 ${length} 8`}
      >
        <line x1="3" y1="4" x2={length - 3} y2="4" />
        <circle cx="3" cy="4" r="3" />
        <circle cx={length - 3} cy="4" r="3" />
      </svg>
    );
  }

  if (props.variant === "vertical") {
    const { length } = props;
    return (
      <svg
        aria-hidden="true"
        className={svgClass}
        style={style}
        width="8"
        height={length}
        viewBox={`0 0 8 ${length}`}
      >
        <line x1="4" y1="3" x2="4" y2={length - 3} />
        <circle cx="4" cy="3" r="3" />
        <circle cx="4" cy={length - 3} r="3" />
      </svg>
    );
  }

  // Elbows: down from the upper panel, then across to the lower one.
  const right = props.variant === "elbow-right";
  return (
    <svg
      aria-hidden="true"
      className={svgClass}
      style={style}
      width="44"
      height="52"
      viewBox="0 0 44 52"
    >
      <path d={right ? "M0 48 H40 V0" : "M44 48 H4 V0"} />
      <circle cx={right ? 0 : 44} cy="48" r="3" />
      <circle cx={right ? 40 : 4} cy="48" r="2" />
      <circle cx={right ? 40 : 4} cy="0" r="3" />
    </svg>
  );
}

/** Short vertical line + node that stands in for the desktop connectors. */
export const StackedConnector = () => (
  <div aria-hidden="true" className="flex flex-col items-start pl-6 lg:hidden">
    <span className="code-connector-stem h-8 w-px" />
    <span className="code-node -mt-px -ml-[3px] h-[7px] w-[7px] rounded-full bg-[var(--gold)]" />
    <span className="code-connector-stem h-3 w-px" />
  </div>
);
