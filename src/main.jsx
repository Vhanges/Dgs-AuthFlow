import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntAppProvider, ConfigProvider } from "antd";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1C5E92",
        },
        components: {
          Input: {
            borderRadius: 10,
            colorTextPlaceholder: "#797979",
            fontSize: 16,
            padding: 10,
            colorBorder: "#D9D9D9",
            colorBgContainer: "#D9D9D9",
            paddingBlock: 5,
            paddingInline: 10,
          },
          Button: {
            fontWeight: "bold",
          },
        },
      }}
    >
      <AntAppProvider>
        <App />
      </AntAppProvider>
    </ConfigProvider>
  </QueryClientProvider>,
);
