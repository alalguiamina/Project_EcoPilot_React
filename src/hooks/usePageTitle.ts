// src/hooks/usePageTitle.ts

import { useLocation } from "react-router-dom";

// The title logic is now inside the hook itself. No separate file needed!
export const usePageTitle = () => {
  const location = useLocation();

  // A simple switch statement to get the title based on the path
  const getTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Tableau de bord";
      case "/data-entry":
        return "Saisie des Données";
      case "/carbon":
        return "Bilan Carbone";
      case "/esg":
        return "Indicateurs ESG";
      default:
        return "Accueil"; // Default title
    }
  };

  const title = getTitle(location.pathname);

  return title;
};
