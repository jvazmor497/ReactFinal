import { useState, useEffect } from "react";
import "./Card.css";
import ArrowDown from "../../assets/images/arrow_down.png";
import SteamButton from "../../assets/images/steam_button.png";
// import placehold from "../../assets/images/placeholdChart.svg";
import Chart from "../Chart/Chart";
import { getImageCover, getBGImage } from "../../services/steamAPI";

export default function Card(prop) {
  const [portrait, setPortrait] = useState(null);
  const [bgImage, setbgImage] = useState(null);

  console.group("Card " + prop.steamAppID);
  console.log(prop.steamAppID);
  console.log("---------------");
  console.table(prop);
  console.groupEnd();

  // Portrait
  useEffect(() => {
    const fetchCover = async () => {
      const games = await getImageCover(prop);
      setPortrait(games);
    };
    fetchCover();
  }, [prop]);

  // Background image
  useEffect(() => {
    const fetchBackground = async () => {
      const games = await getBGImage(prop);
      setbgImage(games);
    };
    fetchBackground();
  }, [prop]);

  return (
    <div className="card">
      <div className="portraitContainer">
        <img className="portrait" src={portrait} alt="portrait" />
        <img className="portrait_blur" src={portrait} alt="portrait" />
      </div>
      <div className="descriptionContainer">
        <h2 className="card-title">{prop.external}</h2>
        <p className="card-description">{prop.gameDescription}</p>
        <div className="card-platforms">
          <a href={"https://store.steampowered.com/app/" + prop.steamAppID}>
            <img src={SteamButton} alt="steam" />
          </a>
        </div>
      </div>
      <div className="priceContainer">
        <Chart prop={prop} />
      </div>
      <div className="buttonContainer">
        <img style={{ filter: " invert(1)" }} src={ArrowDown} alt="" />
      </div>
      <div className="bg">
        <img className="bg_image" src={bgImage} alt="" />
      </div>
    </div>
  );
}
