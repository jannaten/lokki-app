import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../contexts";
import AddLocalizationModal from "./modals/add-localization.modal.component";

function SideBar() {
  const [visible, setVisible] = useState(false);
  const { sidebarLocalizations, onHideLanguage, selectedLocale } =
    useContext(DataLocaleContext);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        border: "0.1rem solid #e9ecef",
        padding: "2rem 0.5rem 0rem 0.5rem",
      }}
    >
      {sidebarLocalizations.map((localization) => (
        <Button
          style={{ borderRadius: "0" }}
          onClick={() => onHideLanguage(localization)}
          key={localization.id}
          className="m-1"
          variant={
            selectedLocale &&
            selectedLocale.some((el) => el === localization.locale)
              ? "outline-dark"
              : "dark"
          }
        >
          {localization.locale}
        </Button>
      ))}
      <Button
        variant="dark"
        onClick={() => setVisible(!visible)}
        style={{ marginTop: "45vh", borderRadius: "0" }}
      >
        Add Language
      </Button>
      <AddLocalizationModal
        visible={visible}
        setVisible={setVisible}
        localizations={sidebarLocalizations}
      />
      <Button variant="dark" style={{ marginTop: "1vh", borderRadius: "0" }}>
        Add Key values
      </Button>
    </div>
  );
}

export default SideBar;
