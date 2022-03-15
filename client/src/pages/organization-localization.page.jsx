import { Layout, OrganizationLocalization } from "../components";
import { DataLocaleContextProvider } from "../contexts";

function OrganizationProducts({ setTheme }) {
  return (
    <Layout setTheme={setTheme}>
      <DataLocaleContextProvider>
        <OrganizationLocalization />
      </DataLocaleContextProvider>
    </Layout>
  );
}

export default OrganizationProducts;
