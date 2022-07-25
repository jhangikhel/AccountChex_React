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
        break;
      }
      case 2: {
        return <FontAwesomeIcon icon={faUserTie} />;
        break;
      }
      case 3: {
        return <FontAwesomeIcon icon={faProjectDiagram} />;
        break;
      }
      case 4: {
        return <FontAwesomeIcon icon={faCity} />;
        break;
      }
      case 5: {
        return <FontAwesomeIcon icon={faUsers} />;
        break;
      }
      case 10: {
        return <FontAwesomeIcon icon={faClock} />;
        break;
      }
      default: {
        return <FontAwesomeIcon icon={faChartPie} />;
        break;
      }
    }
  };
  return <>{getMenuIcon(pageId)}</>;
};
