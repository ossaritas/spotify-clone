import classes from "./MainContainer.module.css";

const MainContainer = (props: { className?: string; children?: any }) => {
  return <div className={classes.main}>{props.children}</div>;
};

export default MainContainer;
