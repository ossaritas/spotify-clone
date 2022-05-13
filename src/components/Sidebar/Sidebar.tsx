import { Link } from "react-router-dom";

import logo from "../../assests/spLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Favourites from "./Favourites";

const Sidebar = () => {
  return (
    <div className="overflow-hidden grid-row-start-1 grid-row-end-3 grid-col-start-1 grid-col-end-2 bg-black pl-[15px] pt-[15px] min-w-[241px] flex flex-col transition duration-150 ease-out">
      <div className="w-auto h-[50px] m-[10px]">
        <Link to="/">
          <img className="w-[130px] h-[40px] " src={logo} alt="" />
        </Link>
      </div>
      <Link
        className="flex p-[10px] items-center text-[#b3b3b3] focus:text-white hover:text-white"
        to="/"
      >
        <div>
          <HomeIcon />
        </div>
        <div className="ml-[10px] p-[2px] h-[24px]">Home</div>
      </Link>
      <Link
        className="flex p-[10px] items-center text-[#b3b3b3] focus:text-white hover:text-white"
        to="/search"
      >
        <div>
          <SearchIcon />
        </div>
        <div className="ml-[10px] p-[2px] h-[24px]">Search</div>
      </Link>
      <Link
        className="flex p-[10px] items-center text-[#b3b3b3] focus:text-white hover:text-white"
        to="/liked"
      >
        <div>
          <LibraryMusicIcon />
        </div>
        <div className="ml-[10px] p-[2px] h-[24px]">Liked Songs</div>
      </Link>

      <p className="h-[0.5px] w-auto p-[0.5px] mx-[10px] my-[10px] bg-gray-500"></p>
      <Favourites />
    </div>
  );
};

export default Sidebar;
