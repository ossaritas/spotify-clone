import MainContainer from "./MainContainer";
import classes from "./Search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomIcon from "../UI/CustomIcon";

const Search = () => {
  return (
    <MainContainer>
      <form className={classes["search-nav"]}>
        <label id="search">
          <CustomIcon>
            <SearchOutlinedIcon />
          </CustomIcon>
          <input type="text" placeholder="Search" />
        </label>
      </form>
    </MainContainer>
  );
};

export default Search;
