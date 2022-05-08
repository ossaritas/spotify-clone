import { ReactNode } from "react";
import classes from "./CustomIcon.module.css";

const CustomIcon = (props: { className?: string; children: ReactNode }) => {
  return (
    <div
      className={`${classes.icon} ${props.className ? props.className : ""}`}
    >
      <button
        className={`${classes["icon-button"]} ${
          props.className ? props.className : ""
        }`}
      >
        {props.children}
      </button>
    </div>
  );
};

export default CustomIcon;
