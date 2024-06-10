import React from "react";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

type Props = {
    children: React.ReactNode;
};
export const ThemeProvider = (props: Props) => {
    const { children } = props;
    return (
        <ConfigProvider
        // theme={{
        //     components: {
        //         Button: {
        //             colorPrimary: "#14753c",
        //             contentFontSize: 16,
        //             colorPrimaryHover: "#14753c",
        //         },
        //     },
        // }}
        >
            <StyleProvider hashPriority="high">{children}</StyleProvider>
        </ConfigProvider>
    );
};
