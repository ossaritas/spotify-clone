import classes from "./Sidebar.module.css";
import Element from "../Elements/Element";
import { Link } from "react-router-dom";

import logo from "../../assests/spLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlayList from "./Playlist";

const homeOptions = [
  { title: "Home", link: "/", icon: <HomeIcon className={classes.icon} /> },
  { title: "Search", link: "/search", icon: <SearchIcon /> },
  { title: "Your Library", link: "/album", icon: <LibraryMusicIcon /> },
];

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes["image-container"]}>
        <Link to="/">
          <img className={classes.image} src={logo} alt="" />
        </Link>
      </div>

      {homeOptions.map((item) => (
        <Element
          key={item.title}
          title={item.title}
          icon={item.icon}
          link={item.link}
        />
      ))}
      <p className={classes.divider}></p>
      <PlayList />
    </div>
  );
};

export default Sidebar;
