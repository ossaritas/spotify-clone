import classes from "./Footer.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DevicesIcon from "@mui/icons-material/Devices";

const Footer = () => {
  return (
    <footer className={classes["footer-container"]}>
      <div className={classes.info}>
        <img src="https://dummyimage.com/60x60/f3ff4a/d41717.jpg" alt="rep" />
        <a>Proin magna. Sed consequat</a>
      </div>
      <div className={classes.player}>
        <div className={classes["player-duration"]}>
          <a>0:00</a>
          <input className={classes.range} type="range" />
          <a>0:00</a>
        </div>
        <ul className={classes["player-actions"]}>
          <li>
            <button>
              <SkipPreviousIcon fontSize="large" />
            </button>
          </li>

          <li>
            <button>
              <PlayCircleIcon fontSize="large" />
            </button>
          </li>

          <li>
            <button>
              <SkipNextIcon fontSize="large" />
            </button>
          </li>
        </ul>
      </div>
      <div className={classes.volume}>
        <ul className={classes["volume-actions"]}>
          <li>
            <button>
              <DevicesIcon />
            </button>
          </li>
          <li>
            <button>
              <VolumeUpIcon />
            </button>
          </li>
        </ul>
        <div className={classes["volume-duration"]}>
          <input type="range" />
        </div>
      </div>
    </footer>
  );
  // <section className={classes["player-container"]}>
  //   <ul className={classes.current}>
  //     <li>
  //       <div>imgaaaaaaaaaaaaaaaaa</div>
  //       <h4>aa</h4>
  //     </li>
  //   </ul>
  //   <div className={classes.player}>
  //     <div className={classes.range}>
  //       <input type="range" />
  //     </div>
  //     <ul className={classes["player-actions"]}>
  //       <li>
  //         <button>
  //           <SkipPreviousIcon fontSize="large" />
  //         </button>
  //       </li>
  //       <li>
  //         <button>
  //           <PlayCircleIcon fontSize="large" />
  //         </button>
  //       </li>
  //       <li>
  //         <button>
  //           <SkipNextIcon fontSize="large" />
  //         </button>
  //       </li>
  //     </ul>
  //   </div>

  //   <ul className={classes.sound}>
  //     <li>
  //       <button>
  //         <DevicesIcon />
  //       </button>
  //     </li>
  //     <li>
  //       <button>
  //         <VolumeUpIcon />
  //       </button>
  //     </li>
  //     <li>
  //       <input type="range" />
  //     </li>
  //   </ul>
  // </section>
};

export default Footer;
