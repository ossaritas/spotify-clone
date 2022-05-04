import { Link } from "react-router-dom";
import classes from "./Element.module.css";

export type OptionsType = {
  className?: string;
  link: string;
  icon: JSX.Element;
  title: string;
};

const Element = (props: OptionsType) => {
  return (
    <Link className={`${classes.element} ${props.className}`} to={props.link}>
      <div className={classes.icon}>{props.icon}</div>
      <div className={classes.title}>{props.title}</div>
    </Link>
  );
};

export default Element;
