import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { AuthProvider } from "./AuthProvider";
import Router from "./route/Router";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body, html {
    width: 100%;
    height: 100%;
  }

`;

export default GlobalStyle;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  </AuthProvider>
);