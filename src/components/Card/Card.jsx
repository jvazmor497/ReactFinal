import { useState, useEffect } from "react";
import "./Card.css";
import ArrowDown from "../../assets/images/arrow_down.png";
import SteamButton from "../../assets/images/steam_button.png";
import placehold from "../../assets/images/placeholdChart.svg";
// import Chart from "../Chart/Chart";

export default function Card(prop) {
  const steamCDN =
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/";

  const [portrait, setPortrait] = useState(null);

  useEffect(() => {
    const checkPortraitImage = async () => {
      try {
        const response = await fetch(
          steamCDN + prop.steamAppID + "/hero_capsule.jpg"
        );

        if (response.ok) {
          console.log("hero_capsule.jpg found");
          setPortrait(steamCDN + prop.steamAppID + "/hero_capsule.jpg");
        }
      } catch {
        try {
          console.log("hero_capsule.jpg not found");

          const response = await fetch(
            steamCDN + prop.steamAppID + "/library_600x900.jpg"
          );

          if (response.ok) {
            setPortrait(steamCDN + prop.steamAppID + "/library_600x900.jpg");
          }
        } catch {
          console.log("library_600x900 not found");
          setPortrait(prop.thumb);
        }
      }
    };

    checkPortraitImage();
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
        <img
          style={{
            filter: "invert(1) opacity(0.5)",
          }}
          src={placehold}
          alt="chart"
        />
        {/* <Chart prop={{ id: "priceContainer" }} /> */}
      </div>
      <div className="buttonContainer">
        <img style={{ filter: " invert(1)" }} src={ArrowDown} alt="" />
      </div>
      <div className="bg">
        <img
          className="bg_image"
          src={steamCDN + prop.steamAppID + "/page_bg_raw.jpg"}
          alt=""
        />
      </div>
    </div>
  );
}
