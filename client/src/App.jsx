import { Home, Organizations, OrganizationLocalization } from "./pages";
import { DataContextProvider } from "./contexts";
import { Routes, Route } from "react-router-dom";
import { routes } from "./config";
import "./App.css";

function App() {
  const { home, organizationByParamRoute } = routes;
  const { organizationLocalizationByParamRoute } = routes;

  return (
    <DataContextProvider>
      <Routes>
        <Route path={home} element={<Home />} />
        <Route
          path={organizationByParamRoute("orgId")}
          element={<Organizations />}
        />
        <Route
          path={organizationLocalizationByParamRoute("orgId", "proId")}
          element={<OrganizationLocalization />}
        />
      </Routes>
    </DataContextProvider>
  );
}

export default App;
