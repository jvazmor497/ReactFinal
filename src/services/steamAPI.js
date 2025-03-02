const steamAPIBaseURL = "https://store.steampowered.com/api/appdetails?appids=";
const steamCDN = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/";

async function getImageCover(prop) {
    try {
        const response = await fetch(
            steamCDN + prop.steamAppID + "/hero_capsule.jpg"
        );

        if (response.ok) {
            console.log(prop.steamAppID + " hero_capsule.jpg found");
            return (steamCDN + prop.steamAppID + "/hero_capsule.jpg");
        }
    } catch {
        try {
            console.log("hero_capsule.jpg not found");

            const response = await fetch(
                steamCDN + prop.steamAppID + "/library_600x900.jpg"
            );

            if (response.ok) {
                return (steamCDN + prop.steamAppID + "/library_600x900.jpg");
            }
        } catch {
            try {
                console.log("hero_capsule.jpg not found");

                const response = await fetch(
                    steamCDN + prop.steamAppID + "/portrait.png"
                );

                if (response.ok) {
                    return (steamCDN + prop.steamAppID + "/portrait.png");
                }
            } catch {
                console.log("library_600x900 not found");
                return prop.thumb;
            }
        }
    }
}

async function getImageBg(prop) {
    try {
        console.log("pagebg.jpg useEffect AAAA");
        const response = await fetch(
            steamCDN + prop.steamAppID + "/page_bg_raw.jpg"
        );

        if (response.ok) {
            console.log("pagebg.jpg found");
            return (steamCDN + prop.steamAppID + "/page_bg_raw.jpg");
        }
    } catch {
        return (steamCDN + prop.steamAppID + "/library_hero.jpg");
    }
};

// getDescriptions
async function getGameDescription(props) {
    try {
        const response = await fetch(`${steamAPIBaseURL}${props.steamAppID}`);
        if (response.ok) {
            const data = await response.json();
            if (data[props.steamAppID].success) {
                return data[props.steamAppID].data.short_description;
            } else {
                throw new Error("Failed to fetch game description");
            }
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("Error fetching game description:", error);
        return "Description not available";
    }
}



export { getImageCover, getImageBg, getGameDescription };