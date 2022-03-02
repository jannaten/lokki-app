import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisiblity] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisiblity(true);
    } else {
      setVisiblity(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) {
    return false;
  }

  return (
    <ScrollUpButton onClick={scrollToTop} style={{ background: "#E5E4E1" }} />
  );
};

export default ScrollToTop;
