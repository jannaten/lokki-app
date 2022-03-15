import { Home, Organizations, OrganizationLocalization } from "./pages";
import { ThemeProvider } from "styled-components";
import { DataContextProvider } from "./contexts";
import { Routes, Route } from "react-router-dom";
import { routes, themes } from "./config";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("defaultTheme");
  const { home, organizationByParamRoute } = routes;
  const { organizationLocalizationByParamRoute } = routes;

  return (
    <ThemeProvider theme={themes[theme]}>
      <DataContextProvider>
        <Routes>
          <Route path={home} element={<Home setTheme={setTheme} />} />
          <Route
            path={organizationByParamRoute("orgId")}
            element={<Organizations setTheme={setTheme} />}
          />
          <Route
            path={organizationLocalizationByParamRoute("orgId", "proId")}
            element={<OrganizationLocalization setTheme={setTheme} />}
          />
        </Routes>
      </DataContextProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
