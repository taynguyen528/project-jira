// import local interface
import { InterfaceSpinner } from "types";

/* import packages */
import { MoonLoader } from "react-spinners";
import clsx from "clsx";

export default function InnerSpinner({
  isLoading = true,
  spinnerClass = "absolute w-full h-full",
  spinnerType = <MoonLoader />,
}: InterfaceSpinner) {
  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={clsx(
        "innerSpinner",
        loadingClass,
        spinnerClass,
        "left-0 top-0 flex justify-center items-center z-50",
        "transition-all duration-300"
      )}
    >
      {spinnerType}
    </div>
  );
}
