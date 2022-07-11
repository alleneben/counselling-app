import React from "react";
import { NavLink } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SideNavItems = ({ path, linktext,icon, onClick }) => {

  // if (path==='logout') {
  //   setTimeout(()=>{
  //     window.location.reload()

  //   },3000)
  // }

  return (
    <li>
      <NavLink to={path ==='logout' ? '/' : path}>
          <i className={icon}></i>
          <span className={"linksName"}>{ linktext }</span>
      </NavLink>
      <span className="tooltip">{ linktext }</span>
    </li>
  );
};

export default SideNavItems;
