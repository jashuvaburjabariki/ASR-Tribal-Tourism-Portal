// ============================================================
// Ananthagiri Hills Interactive Explorer JS
// ASR Tribal Tourism Portal
// ============================================================

const ananthagiriPlaces = [
    {
        name: "Thatiguda (Tadimada) Waterfalls",
        tag: "Waterfalls",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=85",
        description: "A dramatic 100-foot cascading waterfall hidden within dense forest groves and coffee plantations, requiring a refreshing short trek.",
        query: "Thatiguda Waterfalls Ananthagiri Andhra Pradesh"
    },
    {
        name: "Historic Borra Caves",
        tag: "Ancient Wonder",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=85",
        description: "One of India's deepest limestone cave networks, featuring stunning million-year-old stalactites and stalagmites illuminated by vibrant lights.",
        query: "Borra Caves Andhra Pradesh"
    },
    {
        name: "Ananthagiri Coffee Plantations",
        tag: "Coffee Estates",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85",
        description: "The historic cradle where coffee was first introduced to the Eastern Ghats in 1898, filled with shade trees, blossoming coffee, and pepper vines.",
        query: "Ananthagiri Coffee Plantations Andhra Pradesh"
    },
    {
        name: "Tyda Jungle Bells Eco-Nature Camp",
        tag: "Eco-Adventure",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
        description: "An acclaimed wilderness eco-tourism retreat offering forest trekking, birdwatching trails, wooden log cottages, and evening tribal campfires.",
        query: "Tyda Jungle Bells Andhra Pradesh"
    },
    {
        name: "Galikonda View Point",
        tag: "Highest Peak",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
        description: "The highest viewpoint in the Eastern Ghats (~5,000 ft above sea level), providing sweeping panoramas of distant mountain ranges and valleys.",
        query: "Galikonda View Point Araku Ananthagiri"
    },
    {
        name: "Katiki Waterfalls",
        tag: "Jungle Cascade",
        image: "katiki-waterfalls.webp",
        description: "A wild 50-foot natural cascade located near Borra Caves, fed by the perennial Gosthani river and accessed through an adventurous off-road drive.",
        query: "Katiki Waterfalls Andhra Pradesh"
    },
    {
        name: "Damuku Valley View Point",
        tag: "Scenic Lookout",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85",
        description: "A prominent bend on the ghat road offering breathtaking views of undulating green ravines, passing trains through mountain tunnels, and fog.",
        query: "Damuku View Point Ananthagiri"
    },
    {
        name: "Sri Anantha Padmanabha Swamy Temple",
        tag: "Sacred Heritage",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85",
        description: "An ancient forest shrine dedicated to Lord Vishnu, nestled among mountain springs and towering boulders with deep spiritual lore.",
        query: "Sri Anantha Padmanabha Swamy Temple Ananthagiri"
    },
    {
        name: "Gosthani River Origin & Canyon",
        tag: "River Origin",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=85",
        description: "The natural freshwater spring that gives birth to the holy Gosthani river before it carves deep limestone canyons through Borra Caves.",
        query: "Gosthani River Borra Caves Ananthagiri"
    },
    {
        name: "Bowdara Caves & Valley Overlook",
        tag: "Forest Trail",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
        description: "A peaceful foothill cave and scenic vantage point marking the transition from the plains to the steep, winding Eastern Ghats hills.",
        query: "Bowdara Andhra Pradesh"
    },
    {
        name: "Musurumilli Forest Cascade",
        tag: "Hidden Gem",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
        description: "A tranquil natural cascade surrounded by virgin forests and granite pools, popular for family day visits and quiet picnics in nature.",
        query: "Musurumilli Waterfalls Ananthagiri"
    },
    {
        name: "Ananthagiri Ghats Sunset Point",
        tag: "Sunset View",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
        description: "A high-altitude roadside overlook capturing golden sunset reflections across the layered misty ridges of the Eastern Ghats mountain range.",
        query: "Ananthagiri Ghat Road Sunset Point"
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
    card.className = "ananthagiri-location-card";
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
    document.querySelectorAll(".ananthagiri-location-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    const map = document.querySelector("#ananthagiri-map");
    if (map) {
        map.src = `https://www.google.com/maps?q=${encodeURIComponent(card.dataset.query)}&output=embed`;
        map.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function loadWeather() {
    // Ananthagiri coordinates: lat 18.2361, lon 83.0089
    fetch("https://api.open-meteo.com/v1/forecast?latitude=18.2361&longitude=83.0089&current=temperature_2m,weather_code&timezone=Asia%2FKolkata")
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
    const grid = document.querySelector("#ananthagiri-location-grid");
    if (grid) {
        ananthagiriPlaces.forEach((place, index) => {
            const card = createPlaceCard(place, index);
            if (index === 0) card.classList.add("active");
            grid.appendChild(card);
        });

        grid.addEventListener("click", (event) => {
            const card = event.target.closest(".ananthagiri-location-card");
            if (card) selectPlace(card);
        });

        grid.addEventListener("keydown", (event) => {
            if ((event.key === "Enter" || event.key === " ") && event.target.closest(".ananthagiri-location-card")) {
                event.preventDefault();
                selectPlace(event.target.closest(".ananthagiri-location-card"));
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
