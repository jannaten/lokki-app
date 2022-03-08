import { useContext } from "react";
import { Button } from "react-bootstrap";
import { DataLocaleContext } from "../contexts";

function SideBar() {
  const { sidebarLocalizations, onHideLanguage, selectedLocale } =
    useContext(DataLocaleContext);
  return (
    <div
      className="container mt-5"
      style={{ display: "flex", flexDirection: "column" }}
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
        style={{ marginTop: "17rem", border: "none", borderRadius: "0" }}
      >
        Add Language
      </Button>
      <Button
        variant="dark"
        className="mt-2"
        style={{ border: "none", borderRadius: "0" }}
      >
        Add Localization Key
      </Button>
    </div>
  );
}

export default SideBar;
