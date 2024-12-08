/*const api = "http://api.weatherapi.com/v1/forecast.json?key=3c4d301d46e3447f921151212240712&q=London&days=7&aqi=no&alerts=no"
*/
const app = document.getElementById('api')
const temp = document.getElementById('temp')
const text = document.getElementById('text')

const city = document.querySelector('.city')
const search = document.querySelector('.search')

search.addEventListener('click', () => {
    if (city.value.trim() != '') {
        console.log(city.value)
        dateWeather(city.value)
        city.value = ''
        city.blur()
    }
})
city.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && city.value.trim() != '' ){
        console.log(city.value)
        dateWeather(city.value)
        city.value = ''
        city.blur()

    }
   
})

async function getFetchData(endPoint, c) {
    const api = `http://api.weatherapi.com/v1/${endPoint}.json?key=3c4d301d46e3447f921151212240712&q=${c}&days=7&aqi=no&alerts=no`
    
    const result = await fetch(api)

    return result.json()
}

async function dateWeather(c) {
    const fetchData = await getFetchData('weather', c) 
    console.log(fetchData)
}






/*const fetchData =async () => {
    const result = await fetch(`${api}$name=${store.name}`);
    const data = await result.json();
    console.log(data);

    const { 
        current: { temp_c: tempc} ,
        forecast: { forecastday: [{ temp_c, time
        }] },
        location: {name}

} = data


}

fetchData();
*/


