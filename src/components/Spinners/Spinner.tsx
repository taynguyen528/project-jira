import clsx from "clsx";

import { useAppSelector } from "../../store/index";

/* import packages */
import { HashLoader } from "react-spinners";

export function Spinner() {
  let isLoading = useAppSelector((state) => state.spinnerSlice.isLoading);

  const loadingClass = isLoading
    ? "opacity-90 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={clsx(
        "spinner",
        "fixed left-0 top-0 bg-[#87cefa] flex justify-center items-center z-[9999]",
        "h-screen w-screen",
        loadingClass,
        "transition-all duration-[1200ms]"
      )}
    >
      <HashLoader />
    </div>
  );
}
