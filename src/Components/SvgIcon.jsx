import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUserTie,
  faProjectDiagram,
  faUsers,
  faClock,
  faUserLock,
  faHandshake,
  faTasks,
  faUser,
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
        return <FontAwesomeIcon icon={faTasks} />;
        
      }
      case 5: {
        return <FontAwesomeIcon icon={faHandshake} />;
        
      }
      case 10: {
        return <FontAwesomeIcon icon={faClock} />;
        
      }
      case 11: {
        return  <FontAwesomeIcon icon={faUsers} />;
        
      }
      case 12: {
        return  <FontAwesomeIcon icon={faUserLock} />;
        
      }
      case 13: {
        return  <FontAwesomeIcon icon={faUser} />;
        
      }
      default: {
        return <FontAwesomeIcon icon={faChartPie} />;
        
      }
    }
  };
  return <>{getMenuIcon(pageId)}</>;
};
