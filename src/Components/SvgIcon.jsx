import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUserTie,
  faProjectDiagram,
  faUsers,
  faHandsHelping,
  faClock,
  faCity,
} from "@fortawesome/free-solid-svg-icons";

export const SvgIcon = ({ pageId }) => {
  const getMenuIcon = (page) => {
    switch (page) {
      case 1: {
        return <FontAwesomeIcon icon={faChartPie} />;
      
      }
      case 2: {
        return <FontAwesomeIcon icon={faUserTie} />;
        
      }
      case 3: {
        return <FontAwesomeIcon icon={faProjectDiagram} />;
        
      }
      case 4: {
        return <FontAwesomeIcon icon={faCity} />;
        
      }
      case 5: {
        return <FontAwesomeIcon icon={faUsers} />;
        
      }
      case 10: {
        return <FontAwesomeIcon icon={faClock} />;
        
      }
      case 11: {
        return  <FontAwesomeIcon icon={faUsers} />;
        
      }
      default: {
        return <FontAwesomeIcon icon={faChartPie} />;
        
      }
    }
  };
  return <>{getMenuIcon(pageId)}</>;
};
