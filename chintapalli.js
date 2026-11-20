
// ============================================================
// Chinthapalli Interactive Explorer JS
// ASR Tribal Tourism Portal
// ============================================================

const chintapalliPlaces = [
    {
        name: "Chinthapalli Pine Forest (Krishnapuram)",
        tag: "Pine Woods",
        image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=900&q=85",
        description: "Known as the 'Hidden Ooty' of Andhra Pradesh, featuring towering pine and eucalyptus trees with cinematic foggy forest trails.",
        query: "Chintapalli Pine Forest Andhra Pradesh"
    },
    {
        name: "Kothapalli Waterfalls",
        tag: "Waterfall",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=85",
        description: "A spectacular cascading tiered waterfall over broad rock stairways along the Ghostani river, surrounded by lush rainforest canopy.",
        query: "Kothapalli Waterfalls Andhra Pradesh"
    },
    {
        name: "Tajangi Reservoir & Nature Park",
        tag: "Lake & Hills",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85",
        description: "A serene hill lake nestled amidst emerald green mountains with mist reflections, tranquil walking promenades, and adventure ziplining.",
        query: "Tajangi Reservoir Andhra Pradesh"
    },
    {
        name: "Strawberry & Exotic Fruit Farms",
        tag: "Agri-Tourism",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=85",
        description: "Experience high-altitude berry farms where tourists can walk through rows of fresh strawberries, pick ripe berries, and taste fresh fruit.",
        query: "Strawberry Farm Lambasingi Chintapalli Andhra Pradesh"
    },
    {
        name: "RARS Agro-Tourism Research Station",
        tag: "Research & Eco",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
        description: "AP's premier high-altitude agricultural hub featuring organic spices, mountain coffee estates, floriculture, and nature learning tours.",
        query: "Regional Agricultural Research Station Chintapalli"
    },
    {
        name: "Historic Chinthapalli Police Station",
        tag: "Freedom Heritage",
        image: "https://images.unsplash.com/photo-1590059390046-51203a3d5e2e?auto=format&fit=crop&w=900&q=85",
        description: "The historic landmark where freedom fighter Alluri Sitarama Raju commenced the famous 1922 Rampa Rebellion fighting for tribal rights.",
        query: "Chintapalli Police Station Andhra Pradesh"
    },
    {
        name: "Cheruvula Konda & Valley Viewpoint",
        tag: "Viewpoint",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
        description: "High mountain ridge offering panoramic vistas of endless green valleys, sunrise light rays, and morning blankets of rolling clouds.",
        query: "Chintapalli View Point Andhra Pradesh"
    },
    {
        name: "Lambasingi Mist & Cloud Viewpoint",
        tag: "Cold Hill Station",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
        description: "Famous hill hamlet nearby nicknamed the 'Kashmir of Andhra Pradesh', celebrated for chilly temperatures, dense fog, and morning frost.",
        query: "Lambasingi View Point Andhra Pradesh"
    },
    {
        name: "Yerravaram Waterfalls & Stream",
        tag: "Natural Cascade",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=85",
        description: "A pristine secluded forest waterfall cascading into natural stone pools, offering an undisturbed wilderness experience for trekkers.",
        query: "Yerravaram Waterfalls Andhra Pradesh"
    },
    {
        name: "Organic Coffee & Pepper Plantations",
        tag: "Plantation Walk",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85",
        description: "Walk under tall shade trees through flourishing organic Arabica coffee groves and climbing black pepper vines cultivated by tribal farmers.",
        query: "Chintapalli Coffee Plantations Andhra Pradesh"
    }
];

const weatherText = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Misty & Foggy",
    48: "Misty & Foggy",
    51: "Light drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light chill / snow",
    80: "Rain showers",
    95: "Thunderstorm"
};

function createPlaceCard(place, index) {
    const card = document.createElement("article");
    card.className = "chintapalli-location-card";
    card.tabIndex = 0;
    card.dataset.query = place.query;
    card.innerHTML = `
        <div class="card-img-wrap">
            <img src="${place.image}" alt="${place.name}" loading="lazy">
            <span class="place-tag">${place.tag}</span>
        </div>
        <div class="card-body">
            <span class="place-number">${String(index + 1).padStart(2, "0")} / DESTINATION</span>
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <button type="button" class="place-map-button">
                <i class="fas fa-location-dot"></i> View on live map
            </button>
        </div>
    `;
    return card;
}

function selectPlace(card) {
    document.querySelectorAll(".chintapalli-location-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    const map = document.querySelector("#chintapalli-map");
    if (map) {
        map.src = `https://www.google.com/maps?q=${encodeURIComponent(card.dataset.query)}&output=embed`;
        map.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function loadWeather() {
    // Chinthapalli coordinates: lat 17.8722, lon 82.3556
    fetch("https://api.open-meteo.com/v1/forecast?latitude=17.8722&longitude=82.3556&current=temperature_2m,weather_code&timezone=Asia%2FKolkata")
        .then((response) => response.json())
        .then((data) => {
            if (data && data.current) {
                const current = data.current;
                const tempEl = document.querySelector("#weather-temperature");
                const statusEl = document.querySelector("#weather-status");
                if (tempEl) tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
                if (statusEl) statusEl.textContent = weatherText[current.weather_code] || "Current hill conditions available";
            }
        })
        .catch(() => {
            const statusEl = document.querySelector("#weather-status");
            if (statusEl) statusEl.textContent = "Pleasant & cool mountain climate";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Render places
    const grid = document.querySelector("#chintapalli-location-grid");
    if (grid) {
        chintapalliPlaces.forEach((place, index) => {
            const card = createPlaceCard(place, index);
            if (index === 0) card.classList.add("active");
            grid.appendChild(card);
        });

        grid.addEventListener("click", (event) => {
            const card = event.target.closest(".chintapalli-location-card");
            if (card) selectPlace(card);
        });

        grid.addEventListener("keydown", (event) => {
            if ((event.key === "Enter" || event.key === " ") && event.target.closest(".chintapalli-location-card")) {
                event.preventDefault();
                selectPlace(event.target.closest(".chintapalli-location-card"));
            }
        });
    }

    // Mobile navigation toggle
    const menuBtn = document.querySelector(".menu-btn") || document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");
                } else {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            if (!selector || selector === "#") return;
            const target = document.querySelector(selector);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                if (navLinks) navLinks.classList.remove("active");
            }
        });
    });

    // Fetch live weather
    loadWeather();
});
