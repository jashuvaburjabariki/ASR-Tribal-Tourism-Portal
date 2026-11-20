const arakuPlaces = [
    { name: "Araku Valley", image: "av place1.png", description: "Misty Eastern Ghats landscapes, coffee estates, and peaceful valley trails.", query: "Araku Valley, Andhra Pradesh" },
    { name: "Chaparai Water Cascade", image: "chaparai pic.png", description: "A broad natural cascade surrounded by forest and smooth granite rocks.", query: "Chaparai Water Cascade, Andhra Pradesh" },
    { name: "Araku Pinery", image: "pinaripic.jpg", description: "Tall pine trees create a cool, quiet walk through a distinctive woodland.", query: "Araku Pinery, Andhra Pradesh" },
    { name: "Padmapuram Gardens", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=85", description: "A landscaped garden with greenery, flowers, and family-friendly paths.", query: "Padmapuram Gardens, Araku" },
    { name: "Tribal Museum Araku", image: "muesiumpic.jpg", description: "Discover the history, crafts, daily life, and traditions of local communities.", query: "Tribal Museum Araku, Andhra Pradesh" },
    { name: "Galikonda View Point", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85", description: "Look across high ridges and dramatic Eastern Ghats horizons from Galikonda.", query: "Galikonda View Point, Araku" },
    { name: "Katiki Waterfalls", image: "katiki-waterfalls.webp", description: "A refreshing waterfall surrounded by lush forest, rocky trails, and cool mountain air.", query: "Katiki Waterfalls, Andhra Pradesh" },
    { name: "Viewpoint Araku", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85", description: "Pause above the valley for layered hills, clouds, and sunset colors.", query: "Viewpoint Araku, Andhra Pradesh" },
    { name: "Madagada Sunrise View Point", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85", description: "An early-morning viewpoint known for glowing sunrises over the hills.", query: "Madagada Sunrise View Point" },
    { name: "Rana Jilleda Water Falls", image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=85", description: "A refreshing waterfall stop with a green forest setting and cool spray.", query: "Rana Jilleda Water Falls, Andhra Pradesh" },
    { name: "Coffee Museum", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85", description: "Learn about the valley's coffee story, beans, roasting, and local cultivation.", query: "Coffee Museum Araku" },
    { name: "Haritha Valley Resort Araku", image: "haritha-valley-resort.jpg", description: "A comfortable resort stay surrounded by Araku Valley's scenic hills and peaceful natural beauty.", query: "Haritha Valley Resort Araku, Andhra Pradesh" },
    { name: "Chipsa Highway View Point", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85", description: "A roadside mountain viewpoint for expansive views and travel photographs.", query: "Chipsa Highway View Point" }
];

const weatherText = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Misty",
    48: "Misty",
    51: "Light drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light snow",
    80: "Rain showers",
    95: "Thunderstorm"
};

function createPlaceCard(place, index) {
    const card = document.createElement("article");
    card.className = "araku-location-card";
    card.tabIndex = 0;
    card.dataset.query = place.query;
    card.innerHTML = `
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <div class="card-body">
            <span class="place-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <button type="button" class="place-map-button"><i class="fas fa-location-dot"></i> View live map</button>
        </div>
    `;
    return card;
}

function selectPlace(card) {
    document.querySelectorAll(".araku-location-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    document.querySelector("#araku-map").src = `https://www.google.com/maps?q=${encodeURIComponent(card.dataset.query)}&output=embed`;
    document.querySelector("#araku-map").scrollIntoView({ behavior: "smooth", block: "center" });
}

function loadWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=18.3273&longitude=82.8775&current=temperature_2m,weather_code&timezone=Asia%2FKolkata")
        .then((response) => response.json())
        .then((data) => {
            const current = data.current;
            document.querySelector("#weather-temperature").textContent = `${Math.round(current.temperature_2m)}°C`;
            document.querySelector("#weather-status").textContent = weatherText[current.weather_code] || "Current conditions available";
        })
        .catch(() => {
            document.querySelector("#weather-status").textContent = "Weather service unavailable right now";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#araku-location-grid");
    arakuPlaces.forEach((place, index) => grid.appendChild(createPlaceCard(place, index)));

    grid.addEventListener("click", (event) => {
        const card = event.target.closest(".araku-location-card");
        if (card) selectPlace(card);
    });

    grid.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && event.target.closest(".araku-location-card")) {
            event.preventDefault();
            selectPlace(event.target.closest(".araku-location-card"));
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            if (!selector || selector === "#") return;
            const target = document.querySelector(selector);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    loadWeather();
});
