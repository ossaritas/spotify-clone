import classes from "./NavButtons.module.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const NavButtons = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className={classes.navbar}>
      <ul className={classes["nav-items"]}>
        <li>
          <button onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon style={{ width: "25px", height: "25px" }} />
          </button>
        </li>
        <li>
          <button onClick={() => navigate(1)}>
            <ArrowForwardIosIcon style={{ width: "25px", height: "25px" }} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavButtons;
