import React from "react";
import * as FiIcons from "react-icons/fi";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";

export const NavMenuData = [
  {
    path: "/",
    icon: <FiIcons.FiHome />,
    cName: "nav-text",
    text: "Home",
  },
  {
    path: "/teams",
    icon: <SiIcons.SiTeamspeak />,
    cName: "nav-text",
    text: "Teams",
  },
  {
    path: "/targets",
    icon: <GiIcons.GiMultipleTargets />,
    cName: "nav-text",
    text: "Targets",
  },
];
