import type { ComponentPropsWithoutRef } from "react";

/**
 * The page's one content container. Its width is derived from the eave
 * rules (see `.shell` in globals.css): content edges land exactly where
 * each wing meets the flat hairline. Sections must not set their own
 * max-width or horizontal padding on top of it.
 */
export default function Container({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`shell ${className}`.trim()} {...props} />;
}
