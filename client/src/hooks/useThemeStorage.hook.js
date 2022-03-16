import { useState, useEffect } from "react";

export default function useThemeStorage() {
  const [theme, setTheme] = useState(false);
  const themeValue = localStorage.getItem("name");
  useEffect(() => {
    localStorage.setItem("name", themeValue);
    setTheme(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
  return { themeValue, setTheme };
}
