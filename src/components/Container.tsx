import clsx from "clsx";

/* import local interface */
import { BaseProps } from "types";

const Container = ({ className, children }: BaseProps) => {
  return (
    <div className={clsx("container mx-auto px-4", className)}>{children}</div>
  );
};

export default Container;
