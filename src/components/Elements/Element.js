import { Link } from "react-router-dom";
import classes from "./Element.module.css";

const Element = (props) => {
  return (
    <Link
      className={`${classes.element} ${props.className ? props.className : ""}`}
      to={props.link}
    >
      <div className={classes.icon}>{props.icon}</div>
      <div className={classes.title}>{props.title}</div>
    </Link>
  );
};

export default Element;
