// import { colors } from "./colors";
// import HomePagePicture from "../assets/Images/Grid-image2-min.jpg";

// export const styles = (primary) => {
//   const { blackDislove, darkDisolved, darkTransparent } = colors;
//   const { blackTransparent, jumboGreyDisloved, bright } = colors;
//   const { darkHalfTransparent, jumboGrey, secondary, dark } = colors;
//   return {
//     fontSizeBasic: {
//       fontSize: "1rem",
//     },
//     fontSizeBasicWithPointer: {
//       fontSize: "1rem",
//       cursor: "pointer",
//     },
//     fullHeight: { height: "100%" },
//     cardImageStyle: {
//       cursor: "pointer",
//       height: "17.5rem",
//       objectFit: "cover",
//     },
//     marginTopDouble: { marginTop: "-2rem" },
//     flexAlignCenter: { display: "flex", alignItems: "center" },
//     cursorPointer: { cursor: "pointer" },
//     footerCursor: { color: primary, border: "none" },
//     cursorDefault: { cursor: "default" },

//     cusorPointerWithColorPrimary: { color: primary, cursor: "pointer" },
//     cardImageHolderStyle: {
//       width: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: blackDislove,
//       borderBottom: `1px solid ${blackTransparent}`,
//     },
//     borderBottomStyle: {
//       borderBottom: `0.15rem solid ${primary}7F`,
//     },
//     borderLeftStyle: {
//       borderLeft: `0.2rem solid ${primary}E5`,
//     },
//     colorPrimaryTransparent: { color: `${primary}E5` },
//     colorPrimary: { color: primary },
//     footerTextButtonStyle: {
//       color: "white",
//       outline: "none",
//       backgroundColor: primary,
//     },
//     flexColumnAlignStartJustifyCenter: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "flex-start",
//       justifyContent: "center",
//     },
//     listItemStyleWhileSelected: {
//       color: bright,
//       cursor: "pointer",
//       backgroundColor: primary,
//       border: `1px solid ${primary}`,
//     },
//     listItemStyleWhileNotSelected: {
//       color: dark,
//       cursor: "pointer",
//       backgroundColor: bright,
//     },
//     positionTopCenter: { marginLeft: "50vw", marginTop: "30vh" },
//     bgColorBrightWithColorPrimary: { backgroundColor: bright, color: primary },
//     bgColorBrightWithColorSecondary: {
//       backgroundColor: bright,
//       color: secondary,
//     },
//     bgColorPrimaryWithColorBright: { backgroundColor: primary, color: bright },
//     primaryBorderWithPrimaryColor: {
//       border: `1px solid ${primary}`,
//       color: primary,
//     },
//     colorSecondary: { color: secondary },
//     primaryBorderWithBgPrimary: {
//       backgroundColor: primary,
//       border: `1px solid ${primary}`,
//     },
//     primaryBorderWithBgBright: {
//       backgroundColor: bright,
//       border: `1px solid ${primary}`,
//     },
//     outLineNoneWithBgPrimary: {
//       outline: "none",
//       backgroundColor: primary,
//     },
//     colorBright: { color: bright },
//     colorDark: { color: dark },
//     platformBackgroundStyle: {
//       height: "100%",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       backgroundImage: `url(${HomePagePicture})`,
//     },
//     fullHeightWithColorDarkDisolved: {
//       height: "100%",
//       backgroundColor: darkDisolved,
//     },
//     platFormDivHolder: {
//       height: "100%",
//       padding: "2rem",
//       borderRadius: "0.3rem",
//       backgroundColor: bright,
//     },
//     flexRowAlignCenter: {
//       display: "flex",
//       alignItems: "center",
//       flexDirection: "row",
//     },
//     preLineText: {
//       whiteSpace: "pre-line",
//     },
//     bgPrimary: { backgroundColor: primary },
//     flexRowAlignEnd: {
//       color: bright,
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "flex-end",
//     },
//     borderPrimary: { border: `1px solid ${primary}` },
//     latestBlogImgStyle: {
//       cursor: "pointer",
//       height: "12.5rem",
//       objectFit: "cover",
//       marginBottom: "2rem",
//     },
//     flexRowAlignJustifyCenterWithWrap: {
//       display: "flex",
//       flexWrap: "wrap",
//       alignItems: "center",
//       flexDirection: "row",
//       justifyContent: "center",
//     },
//     homeScreenImagePosiiton: { position: "relative", zIndex: "-1" },
//     homeScreenImageStyle: {
//       width: "100%",
//       objectFit: "cover",
//       height: "40rem",
//     },
//     homeScreenHolder: {
//       zIndex: "2",
//       width: "100%",
//       color: bright,
//       position: "relative",
//       marginTop: "-25.5rem",
//       paddingBottom: "10rem",
//     },
//     bgPrimaryHalfTrasparent: { backgroundColor: `${primary}B2` },
//     jumboTronListGroupStyle: {
//       color: dark,
//       position: "absolute",
//       backgroundColor: bright,
//     },
//     listGroupOtherFieldStyle: {
//       color: "black",
//       display: "flex",
//       position: "absolute",
//       alignItems: "center",
//       flexDirection: "column",
//       backgroundColor: bright,
//       justifyContent: "center",
//     },
//     marginBottomNegetive: { marginBottom: "-1rem" },
//     advancedSearchHolder: {
//       borderRadius: "0.25rem",
//       backgroundColor: bright,
//       border: `1px solid ${primary}`,
//     },
//     categoryColumnStyle: { overflow: "auto", width: "10em", height: "18em" },
//     categoryFormHolder: {
//       display: "flex",
//       overflow: "auto",
//       alignItems: "center",
//       flexDirection: "row",
//       justifyContent: "flex-start",
//     },
//     jumboGreyBg: { backgroundColor: jumboGrey },
//     websiteBgImgStyle: {
//       height: "100%",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//     },
//     shadowBgStyle: {
//       zIndex: "-5",
//       width: "100%",
//       height: "100%",
//       backgroundColor: darkTransparent,
//     },
//     bgJumboGreyDisovedFullHeight: {
//       height: "100%",
//       backgroundColor: jumboGreyDisloved,
//     },
//     brightTextWithShadow: {
//       color: bright,
//       textShadow: `0px 2px 2px ${darkHalfTransparent}`,
//     },
//     websiteColHolder: {
//       height: "100%",
//       padding: "1.5rem",
//       borderRadius: "0.3rem",
//       backgroundColor: bright,
//     },
//     jumboDivHolder: {
//       padding: "1.5rem",
//       borderRadius: "0.3rem",
//       backgroundColor: bright,
//     },
//     cursorPointerOneThirdHeight: {
//       cursor: "pointer",
//       width: "30%",
//     },
//     caroselImageHeight: {
//       width: "100%",
//       height: "45rem",
//       objectFit: "cover",
//     },
//     scrollToTopPosition: {
//       top: 0,
//       behavior: "smooth",
//     },
//     pageNotFoundContainer: {
//       height: "51vh",
//       display: "flex",
//       alignItems: "center",
//       flexDirection: "row",
//       backgroundColor: bright,
//       justifyContent: "center",
//     },
//   };
// };
