export default {
  headerPosition: {
    position: "fixed",
    width: "100vw",
    zIndex: 13,
  },
  headerIcon: { fontSize: "1.6rem" },
  headingHolder: { display: "flex", alignItems: "center", width: "100%" },
  headingIcon: { marginLeft: "auto", marginRight: "1%" },
  headerDropDown: { color: "white", marginLeft: "10%" },
  cardHolder: {
    width: "15vw",
    height: "20vh",
    margin: "0.5rem",
    borderRadius: "0.15rem",
    backgroundColor: "white",
    padding: "1.25rem 1.25rem",
    backgroundClip: "border-box",
    border: "1px solid rgba(0, 0, 0, 0.125)",
  },
  ifCompanyShrink: { paddingTop: "10%", paddingLeft: "5%" },
  ifNotCompanyShrink: { paddingTop: "2.5%" },
  ifLocalizationValueShrink: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  ifNotLocalizationValueShrink: {
    display: "flex",
    flexDirection: "row",
  },
  localeValueHolder: {
    width: "100%",
    paddingTop: "2.5%",
    marginRight: "1%",
  },
  cardIcon: { width: "35%", margin: "2.5% 0%" },
  companyRow: {
    display: "flex",
    justifyContent: "center",
  },
  countPadding: {
    padding: "1vh 0vh 2vh 0vh",
  },
  buttonHandler: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  ifSideBarShrink: {
    marginTop: "0%",
  },

  ifNotSideBarShrink: {
    marginTop: "2.8%",
    marginRight: "12vw",
    zIndex: "12",
  },
  ifAsideShrink: {
    height: "20%",
    marginTop: "10%",
    marginBottom: "10%",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ced4da",
  },
  ifNotAsideShrink: {
    position: "fixed",
    height: "100vh",
    width: "11vw",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ced4da",
  },
  ifSideBarSquareButtonShrink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  ifNotSideBarSquareButtonShrink: {
    height: "50vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  ifSquareButtonShrink: {
    width: "200px",
    height: "4rem",
  },
  ifNotSquareButtonShrink: {
    width: "80%",
    height: "4rem",
    display: "flex",
    marginBottom: "3%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};
