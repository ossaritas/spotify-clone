import { PlayArrowRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
      className={`${"group h-[240px] flex flex-col items-center p-[16px] rounded-[10px] bg-[#1F1F1F] shadow-xl space-y-[5px] transition-all ease-in-out  duration-300 hover:bg-[#333333] "} ${
        props.className ? props.className : ""
      }`}
    >
      <div className="w-[150px] h-[150px] ">
        <div className="relative w-[150px] h-[150px]">
          <img
            className="w-full h-full object-contain rounded-[5px] shadow-sm shadow-[#181818]"
            src={props.img}
            alt="Cover"
          />
        </div>

        <button className="relative bottom-[35%] hidden left-[65%] text-white bg-[#1db954] opacity-90 rounded-full group-hover:block  hover:opacity-100 hover:scale-105">
          <Link to={`/${props.type}/${props.id}`}>
            <PlayArrowRounded style={{ width: "45px", height: "45px" }} />
          </Link>
        </button>
      </div>
      <div className="text-[#c9c9c9] w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
        <span>{props.title}</span>
      </div>
      <div className="text-[12px] text-[#8c8b8b] w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
        <span>
          {props.description} - {props.type.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default Card;
