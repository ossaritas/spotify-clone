import { PlayArrowRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes["card-container"]}>
      <img className={classes.img} src={props.img} alt="Cover" />
      <span className={classes.title} title="EMINEM BEST OF">
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
