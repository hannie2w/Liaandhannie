const app = document.getElementById('api')
const temp = document.getElementById('temp')
const text = document.getElementById('text')
const icon = document.getElementById('icon')
const week = document.getElementById('week')
const day = document.getElementById('hour')
const windowWeather = document.getElementById('window')

const input = document.querySelector('.city')
const search = document.querySelector('.search')

search.addEventListener('click', () => {
    city = input.value.trim()

    const apiKey = 'd29db7276247491f816132839242212'
    const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`

    fetch(api).then((response)=> {
        return response.json()
    }).then(async (data) => {
        const{ 
            current: {temp_c: temperature, condition},
            location: {name},
            forecast: {forecastday} 
        } = data
        icon.innerHTML = '<img src="https://' + condition.icon + '"/>'
        text.innerHTML = name  
        temp.innerHTML = Math.round(temperature)+'°С'
        try {
            let windowImage = "" ;

            if (condition.text.includes("Sunny") || condition.text.includes("Clear")) {
                windowImage = "assets/images/Sunny.png";
            } else if (condition.text.includes("Partly cloudy") || condition.text.includes("Cloudy") || condition.text.includes("Overcast") || condition.text.includes("Patchy rain possible") || condition.text.includes("Light rain shower") || condition.text.includes("Moderate or heavy rain shower") || condition.text.includes("Torrential rain shower")) {
                windowImage = "assets/images/Partly cloudy.jpg";
            } else if (condition.text.includes("Mist") || condition.text.includes("Freezing fog") || condition.text.includes("Fog")) {
                windowImage = "assets/images/Mist.jpg";
            } else if (condition.text.includes("Patchy rain possible") || condition.text.includes("Patchy sleet possible") || condition.text.includes("Patchy freezing drizzle possible") || condition.text.includes("Thundery outbreaks possible") || condition.text.includes("Patchy light drizzle") || condition.text.includes("Light drizzle") || condition.text.includes("Freezing drizzle") || condition.text.includes("Heavy freezing drizzle") || condition.text.includes("Patchy light rain") || condition.text.includes("Light rain") || condition.text.includes("Moderate rain at times") || condition.text.includes("Moderate rain") || condition.text.includes("Heavy rain at times") || condition.text.includes("Heavy rain") || condition.text.includes("Light freezing rain") || condition.text.includes("Light showers of ice pellets")  || condition.text.includes("Moderate or heavy freezing rain")|| condition.text.includes("Moderate or heavy showers of ice pellets") || condition.text.includes("Heavy rain") || condition.text.includes("Light sleet showers") || condition.text.includes("Moderate or heavy sleet showers") || condition.text.includes("Patchy light rain with thunder") || condition.text.includes("Moderate or heavy rain with thunder") ) {
                windowImage = "assets/images/Rain.jpg";  
            } else if (condition.text.includes("Patchy snow possible") ||  condition.text.includes("Blowing snow") || condition.text.includes("Blizzard") || condition.text.includes("Light sleet") || condition.text.includes("Patchy light snow") || condition.text.includes("Moderate or heavy sleet") || condition.text.includes("Light snow") || condition.text.includes("Patchy moderate snow") || condition.text.includes("Moderate snow") || condition.text.includes("Patchy heavy snow") || condition.text.includes("Heavy snow") || condition.text.includes("Ice pellets") || condition.text.includes("Light snow showers") || condition.text.includes("Moderate or heavy snow showers")  || condition.text.includes("Patchy light snow with thunder") || condition.text.includes("Moderate or heavy snow with thunder")) {
                windowImage = "assets/images/Snow.jpg";  
            } else {
                windowImage = "assets/images/Sunny.png";  
            }
            windowWeather.src = windowImage;
        
        } catch (error) {
            console.error('Error fetching weather data:', error);  
        }
        await updateForecastHourInfo(forecastday)
        await updateForecastInfo(forecastday)
    })
})                                      
async function updateForecastInfo(forecastday) {
    const forecastData = forecastday

    week.innerHTML = ''
    
    forecastData.forEach(el => {
        const date = new Date(Date.parse(el.date))
        const forecastItem = `<div class="container">
        <ul>
            <li>${date.getDate() + '.' + (date.getMonth()+1)}</li>
            <li><img src="https://${el.day.condition.icon}"/></li>
            <li>${Math.round(el.day.avgtemp_c)}°С</li>
        </ul> 
    </div>`
        week.insertAdjacentHTML('beforeend',forecastItem)
    })  
}
async function updateForecastHourInfo(forecastday) {
    const forecastData = forecastday[0]
    
    week.innerHTML = ''
    day.innerHTML = ''

    const forecastHours = forecastData.hour
    forecastHours.forEach(hour => {
        const time = new Date(Date.parse(hour.time))
        const forecastItemHour = `<div class="content">
                    <ul>
                        <li class="t" >${time.getHours() + ':' + time.getMinutes()+'0'}</li>
                        <li class="t"><img src="https://${hour.condition.icon}"/></li>
                        <li class="t">${Math.round(hour.temp_c)}°С</li>
                    </ul>
                </div>`
    day.insertAdjacentHTML('beforeend',forecastItemHour)
 })
}

