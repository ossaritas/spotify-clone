import classes from "./CustomIcon.module.css";

const CustomIcon = (props) => {
  return (
    <div
      className={`${classes.icon} ${props.className ? props.className : ""}`}
    >
      <button
        className={`${classes["icon-button"]} ${
          props.className ? props.className : ""
        }`}
      >
        {props.children}
      </button>
    </div>
  );
};

export default CustomIcon;
