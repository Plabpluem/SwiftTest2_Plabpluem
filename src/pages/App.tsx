import "./App.scss";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import FormUser from "../components/form/formUser";
import UserTable from "../components/table/userTable";
import HeaderTranslate from "../components/header/Header";
import {useTranslation} from "react-i18next";

function App() {
  const {t} = useTranslation()
  return (
    <Layout className="mainContainer">
      <Header>
        <h1>
          {t("Form")}
        </h1>
        <HeaderTranslate />
      </Header>
      <Layout>
        <FormUser />
        <UserTable />
      </Layout>
    </Layout>
  );
}

export default App;
