import clsx from "clsx";

/* import interfaces */
import { BaseProps } from "types";

export function Label({ className, children }: BaseProps) {
  return (
    <span className={clsx("custom-label", "capitalize", className)}>
      {children}
    </span>
  );
}
