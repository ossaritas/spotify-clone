import { NavigateFunction, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const NavButtons = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="w-full z-10 fixed top-0 h-[70px] flex items-center text-white bg-gradient-to-bl from-[#00000090] to-[#000000]">
      <ul className="ml-[10px] flex space-x-4 px-[15px] list-none">
        <li>
          <button className="hover:scale-110" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon style={{ width: "25px", height: "25px" }} />
          </button>
        </li>
        <li>
          <button className="hover:scale-110" onClick={() => navigate(1)}>
            <ArrowForwardIosIcon style={{ width: "25px", height: "25px" }} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavButtons;
