const key = "VNJ8NXSP3S4BE7VGXN2W3GQ5A"

async function getWeather(ciudad) {

    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?unitGroup=metric&key=${key}`;
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const address = data.address;
        const datetime = data.currentConditions.datetime;
        const temp = data.currentConditions.temp;
        const feelslike = data.currentConditions.feelslike;
        const conditions = data.currentConditions.conditions;
        const windspeed = data.currentConditions.windspeed;
        const humidity = data.currentConditions.humidity;
        const visibility = data.currentConditions.visibility;
        const icon = data.currentConditions.icon;

        return { address, datetime, temp, feelslike, conditions, windspeed, humidity, visibility, icon };

    } catch (error) {
        console.error("Error al obtener el clima:", error);
        throw error;
    }
}

async function mostrarClima(ciudad) {
    const clima = await getWeather(ciudad);

    document.getElementById("city").textContent = clima.address;

    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    document.getElementById("datetime").textContent = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById("conditions").textContent = `${clima.conditions} · Feels like ${clima.feelslike}°C`;
    document.getElementById("temp").textContent = `${clima.temp}°C`;
    document.getElementById("wind").textContent = `${clima.windspeed} km/h`;
    document.getElementById("humidity").textContent = `${clima.humidity}%`;
    document.getElementById("visibility").textContent = `${clima.visibility} km`;

    const iconMap = {
        "snow": "snowflake",
        "rain": "cloud-rain",
        "fog": "cloud-fog",
        "wind": "wind",
        "cloudy": "cloud",
        "partly-cloudy-day": "cloud-sun",
        "partly-cloudy-night": "cloud-moon",
        "clear-day": "sun",
        "clear-night": "moon"
    };
    const lucideIcon = iconMap[clima.icon] || "cloud";
    document.getElementById("weather-icon").innerHTML = `<i data-lucide="${lucideIcon}" style="width: 100px; height: 100px; opacity: 0.8; stroke-width: 1.5;"></i>`;

    lucide.createIcons();
}


// ── BUSCADOR ──
const searchInput = document.getElementById("search");

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const ciudad = searchInput.value.trim();

        if (ciudad !== "") {
            mostrarClima(ciudad);
        }
    }
});

mostrarClima("Santiago");