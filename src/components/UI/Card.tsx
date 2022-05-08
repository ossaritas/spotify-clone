import { PlayArrowRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";

const Card = (props: {
  className?: string;
  img: string;
  title?: string;
  description?: string;
  type: string;
  id: string;
}) => {
  return (
    <div
      className={`${classes["card-container"]} ${
        props.className ? props.className : ""
      }`}
    >
      <img className={classes.img} src={props.img} alt="Cover" />
      <span className={classes.title}>
        <span>{props.title}</span>
      </span>
      <div className={classes.description}>
        <span>{props.description}</span>
        <button className={classes["play-btn"]}>
          <Link to={`/${props.type}/${props.id}`}>
            <PlayArrowRounded style={{ width: "40px", height: "40px" }} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
