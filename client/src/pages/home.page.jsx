import { Layout, OrganizationList } from "../components";

const Home = ({ setTheme }) => (
  <Layout setTheme={setTheme}>
    <OrganizationList />
  </Layout>
);

export default Home;
