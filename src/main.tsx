import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "~/config/theme";
import "~/assets/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "~/config/config";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "~/config/query_client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId={config.oauth.client_id}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer theme={"dark"} />
          <ReactQueryDevtools />
          <App />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
