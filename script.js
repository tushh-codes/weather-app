const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

  console.log(respData);

  addWeatherToPage(respData);
}

async function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
   
 <div class="imageIcon">
  <img src ='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'></img></div>
  <small>${data.weather[0].description}</small>
  <h2 class='temp'>${temp} °C</h2>
  
  <h5>${data.name},  ${data.sys.country}</h5>
  <h4 class= 'humidity'>${data.main.humidity}% humidity</h4>
  <h4 class= 'wind'>Wind Speed</h4>
  <h4 class= 'wind'>${data.wind.speed}Km/h</h4>

 
  `;
  main.innerHTML = ``;

  main.appendChild(weather);
  imageLoader();
}

const imageLoader = () => {
  const d = new Date();
  let hour = d.getHours();
  console.log(hour);

  const weatherImage = document.createElement("div");
  weatherImage.classList.add("weatherImage");

  if (hour <= 7 || hour >= 18) {
    weatherImage.innerHTML = `
    <img src ='./tropical-landscape-with-sea-bay-night_107791-5364.jpg'></img>
    `;
  } else
    weatherImage.innerHTML = `
    <img src ='./gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg' alt ='image'></img>
    `;
  main.appendChild(weatherImage);
};
function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
