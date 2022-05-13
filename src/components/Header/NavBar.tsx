import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed top-0 w-full flex items-center h-[70px] bg-gradient-to-bl from-[#00000085] to-[#000000]">
      <ul className="flex space-x-4 px-[15px] list-none">
        <li className="text-[#10a710] font-semibold cursor-default p-[5px]">
          FEATURED
        </li>
        <li className="flex">
          <Link
            className="p-[5px] rounded  hover:text-[#c6c2c2] focus:text-white focus:bg-gray-500"
            to="/playlist"
          >
            {" "}
            Playlists
          </Link>
        </li>

        <li className="flex">
          <Link
            className="p-[5px] rounded  hover:text-[#c6c2c2] focus:text-white focus:bg-gray-500 active:bg-gray-500"
            to="/albums"
          >
            Albums
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
