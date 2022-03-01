import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <ul className={classes["nav-items"]}>
        <li>
          <p>FEATURED</p>
        </li>
        <li>
          <Link to="/playlist"> Playlists</Link>
        </li>

        <li>
          <Link to="/albums">Albums</Link>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
