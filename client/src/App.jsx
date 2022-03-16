import { Home, Organizations, OrganizationLocalization } from "./pages";
import { ThemeProvider } from "styled-components";
import { DataContextProvider } from "./contexts";
import { Routes, Route } from "react-router-dom";
import { useThemeStorage } from "./hooks";
import { routes, themes } from "./config";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const { themeValue, setTheme } = useThemeStorage();
  const { home, organizationByParamRoute } = routes;
  const { organizationLocalizationByParamRoute } = routes;
  return (
    <ThemeProvider theme={themes[themeValue ? themeValue : "darkTheme"]}>
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
