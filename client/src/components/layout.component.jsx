import { Header } from ".";
import { DataChildContextProvider } from "../contexts";

const Layout = ({ children, setTheme }) => (
  <DataChildContextProvider>
    <Header setTheme={setTheme} />
    {children}
  </DataChildContextProvider>
);
export default Layout;
