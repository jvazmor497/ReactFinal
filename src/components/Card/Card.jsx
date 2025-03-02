import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Card.css";
import ArrowDown from "../../assets/images/arrow_down.png";
import SteamButton from "../../assets/images/steam_button.png";
// import placehold from "../../assets/images/placeholdChart.svg";
import Chart from "../Chart/Chart";
import {
  getImageCover,
  getImageBg,
  getGameDescription,
} from "../../services/steamAPI";

export default function Card(props) {
  const [portrait, setPortrait] = useState(null);
  const [bgImage, setbgImage] = useState(null);
  const [height, setHeight] = useState("0px");
  const [description, setDescription] = useState(null);
  const contentRef = useRef(null);

  console.group("Card " + props.steamAppID);
  console.log(props.steamAppID);
  console.log("---------------");
  console.table(props);
  console.groupEnd();

  //
  useEffect(() => {
    setHeight(props.isActive ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [props.isActive]);

  // Portrait
  useEffect(() => {
    const fetchCover = async () => {
      const games = await getImageCover(props);
      setPortrait(games);
    };
    fetchCover();
  }, [props]);

  // Background image
  useEffect(() => {
    const fetchBackground = async () => {
      const games = await getImageBg(props);
      setbgImage(games);
    };
    fetchBackground();
  }, [props]);

  // Toggle active
  const toggleActive = () => {
    props.onClick();
  };

  // Description
  useEffect(() => {
    const fetchDescription = async () => {
      const games = await getGameDescription(props);
      setDescription(games);
    };
    fetchDescription();
  }, [props]);

  return (
    <div className="card" onClick={toggleActive}>
      <div className="portraitContainer">
        <img className="portrait" src={portrait} alt="portrait" />
        <img className="portrait_blur" src={portrait} alt="portrait" />
      </div>
      <div className="descriptionContainer">
        <h2 className="card-title">{props.external}</h2>
        <p className="card-description">{props.gameDescription}</p>
        {/* <div className="card-platforms">
          <a href={"https://store.steampowered.com/app/" + props.steamAppID}>
            <img src={SteamButton} alt="steam" />
          </a>
        </div> */}
      </div>
      <div className="descriptionContainer">
        <p>{description}</p>
      </div>
      <div className="buttonContainer">
        <img style={{ filter: " invert(1)" }} src={ArrowDown} alt="" />
      </div>
      <div className="bg">
        <img className="bg_image" src={bgImage} alt="" />
      </div>
      <div
        className="downContent"
        ref={contentRef}
        style={{
          height: height,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
          transition: "height 0.5s ease-in-out",
        }}
      >
        {props.isActive ? <Chart prop={props} /> : null}
        {/* {props.isActive ? <h1>Aqui va un Chart</h1> : null} */}
      </div>
    </div>
  );
}

Card.propTypes = {
  steamAppID: PropTypes.string.isRequired,
  external: PropTypes.string.isRequired,
  gameDescription: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
