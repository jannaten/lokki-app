import { Header } from ".";
import { DataChildContextProvider } from "../contexts";

const Layout = ({ children }) => (
  <DataChildContextProvider>
    <Header />
    {children}
  </DataChildContextProvider>
);
export default Layout;
