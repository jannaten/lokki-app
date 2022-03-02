import { Layout, OrganizationLocalization } from "../components";
import { DataLocaleContextProvider } from "../contexts";

function OrganizationProducts() {
  return (
    <Layout>
      <DataLocaleContextProvider>
        <OrganizationLocalization />
      </DataLocaleContextProvider>
    </Layout>
  );
}

export default OrganizationProducts;
