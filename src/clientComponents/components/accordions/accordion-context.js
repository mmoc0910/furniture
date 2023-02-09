import { createContext, useContext } from "react";

const AccordionContext = createContext();

const AccordionProvider = (props) => {
  return (
    <AccordionContext.Provider value={props}>
      {props.children}
    </AccordionContext.Provider>
  );
};

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === "undefined")
    throw new Error("useDropdown must be used within a AuthProvider");
  return context;
};

export { useAccordion, AccordionProvider };
