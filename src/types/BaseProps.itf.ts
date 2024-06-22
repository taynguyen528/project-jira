import { FormInstance } from "antd";
import React from "react";
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormComponentProps extends BaseProps {
  name?: string;
}

export interface EditorProps extends FormComponentProps {
  formInstance?: FormInstance;
}

export interface ButtonLocalProps extends BaseProps {
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
    | "gray";
  handleOnClick?: () => void;
}

export interface ResponsiveProps {
  children: JSX.Element;
}

export interface InterfaceSpinner {
  isLoading?: boolean;
  spinnerClass?: string;
  spinnerType?: JSX.Element;
}
