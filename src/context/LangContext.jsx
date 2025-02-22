import { createContext, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLang = () => {
    setLang((prevLang) => (prevLang == "en" ? "ar" : "en"));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <div dir={lang == "ar" ? "rtl" : "ltr"}>{children}</div>
    </LangContext.Provider>
  );
};
