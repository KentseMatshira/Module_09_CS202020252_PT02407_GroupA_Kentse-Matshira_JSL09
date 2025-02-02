try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`; // Safer alternative using textContent
} catch (err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`; // Using textContent
}

try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
    if (!res.ok) {
        throw Error("Something went wrong");
    }
    const data = await res.json();

    // Safely create elements instead of using innerHTML
    const cryptoTopDiv = document.getElementById("crypto-top");
    const img = document.createElement('img');
    img.src = data.image.small;
    const span = document.createElement('span');
    span.textContent = data.name;

    // Clear existing content and append the new elements
    cryptoTopDiv.innerHTML = '';
    cryptoTopDiv.appendChild(img);
    cryptoTopDiv.appendChild(span);

    const cryptoDiv = document.getElementById("crypto");
    cryptoDiv.innerHTML = ''; // Clear the div before adding new elements

    const priceP = document.createElement('p');
    priceP.textContent = `🎯: $${data.market_data.current_price.usd}`;
    const highP = document.createElement('p');
    highP.textContent = `👆: $${data.market_data.high_24h.usd}`;
    const lowP = document.createElement('p');
    lowP.textContent = `👇: $${data.market_data.low_24h.usd}`;

    cryptoDiv.appendChild(priceP);
    cryptoDiv.appendChild(highP);
    cryptoDiv.appendChild(lowP);
} catch (err) {
    console.error(err);
}

function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const res = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    );
    if (!res.ok) {
      throw Error("Weather data not available");
    }
    const data = await res.json();
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // Safely create weather elements
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = ""; // Clear the div before adding new elements

    const img = document.createElement("img");
    img.src = iconUrl;
    const tempP = document.createElement("p");
    tempP.textContent = `${Math.round(data.main.temp)}º`;
    tempP.className = "weather-temp";
    const cityP = document.createElement("p");
    cityP.textContent = data.name;
    cityP.className = "weather-city";

    weatherDiv.appendChild(img);
    weatherDiv.appendChild(tempP);
    weatherDiv.appendChild(cityP);
  } catch (err) {
    console.error(err);
  }
});