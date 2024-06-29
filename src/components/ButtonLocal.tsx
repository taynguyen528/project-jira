// import local types
import { ButtonLocalProps } from "../types/BaseProps.itf";

// import other library
import clsx from "clsx";

export default function ButtonLocal({
  children,
  className = "px-5 py-2.5 rounded-lg",
  baseColor,
  handleOnClick,
}: Partial<ButtonLocalProps>) {
  const buttonColor = (
    baseColor:
      | "red"
      | "orange"
      | "yellow"
      | "green"
      | "teal"
      | "blue"
      | "indigo"
      | "purple"
      | "pink"
      | "gray"
  ) => {
    switch (baseColor) {
      case "red":
        return "bg-red-500 hover:bg-red-600 focus:ring-red-300";
      case "orange":
        return "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300";
      case "yellow":
        return "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300";
      case "green":
        return "bg-green-500 hover:bg-green-600 focus:ring-green-300";
      case "teal":
        return "bg-teal-500 hover:bg-teal-600 focus:ring-teal-300";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300";
      case "indigo":
        return "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300";
      case "purple":
        return "bg-purple-500 hover:bg-purple-600 focus:ring-purple-300";
      case "pink":
        return "bg-pink-500 hover:bg-pink-600 focus:ring-pink-300";
      default:
        return "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300";
    }
  };
  return (
    <button
      type="button"
      className={clsx(
        `text-white text-lg font-medium`,
        `focus:outline-none focus:ring-4`,
        `transition duration-300`,
        baseColor && buttonColor(baseColor!),
        className
      )}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
