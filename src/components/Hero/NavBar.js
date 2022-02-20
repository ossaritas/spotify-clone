import classes from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <ul className={classes["nav-items"]}>
        <li>
          <a href="#1">Playlists</a>
        </li>
        <li>
          <a href="#">Artists</a>
        </li>
        <li>
          <a href="#">Podcasts</a>
        </li>
        <li>
          <a href="#">Albums</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
