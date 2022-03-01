import classes from "./NavButtons.module.css";
import { useNavigate } from "react-router-dom";
import CustomIcon from "../UI/CustomIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const NavButtons = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.navbar}>
      <ul className={classes["nav-items"]}>
        <li>
          <button onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon style={{ width: "30px", height: "30px" }} />
          </button>
        </li>
        <li>
          <button onClick={() => navigate(1)}>
            <ArrowForwardIosIcon style={{ width: "30px", height: "30px" }} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavButtons;
