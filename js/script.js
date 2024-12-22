const app = document.getElementById('api')
const temp = document.getElementById('temp')
const text = document.getElementById('text')
const d = document.getElementById('d')
const icon = document.getElementById('icon')
const week = document.getElementById('week')
const day = document.getElementById('day')
const windowWeather = document.getElementById('w')



const input = document.querySelector('.city')
const search = document.querySelector('.search')

search.addEventListener('click', () => {
    city = input.value.trim()
    console.log(city)

    const apiKey = 'd29db7276247491f816132839242212'

    const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`

    fetch(api).then((response)=> {
        return response.json()
    }).then(async (data) => {
        console.log(data)
        const{ 
            current: {temp_c: temperature, condition},
            location: {name},
            forecast: {forecastday} 
        } = data
        console.log(condition.icon)
        icon.innerHTML = '<img src="https://' + condition.icon + '"/>'
        text.innerHTML = name 
        temp.innerHTML = Math.round(temperature)+'°С'
        console.log(forecastday[0].day.avgtemp_c);
        d.innerHTML = forecastday[0].day.avgtemp_c
    
        await updateForecastHourInfo(name,forecastday)
        await updateForecastInfo(name,forecastday)

        
    })

})



async function updateForecastInfo(name,forecastday) {
    const  forecastData = forecastday
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    week.innerHTML = ''
    forecastData.forEach(el => {
        const date = new Date(Date.parse(el.date))
        const forecastItem = `<div class="conteiner">
        <ul>
            <li>${date.getDate() + '.' + (date.getMonth()+1)}</li>
            <li><img src="https://${el.day.condition.icon}"/></li>
            <li id="d">${Math.round(el.day.avgtemp_c)}°С</li>
        </ul> 
    </div>
        `
        week.insertAdjacentHTML('beforeend',forecastItem)
    })  
}

async function updateForecastHourInfo(name,forecastday) {
    const  forecastData = forecastday[0]
    
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    week.innerHTML = ''
    day.innerHTML = ''

    const date = new Date(Date.parse(forecastData.date))
    const forecastHours = forecastData.hour
    forecastHours.forEach(hour => {
        const time = new Date(Date.parse(hour.time))
        const forecastItemHour = `
        <div class="time" id="start" >
                    <ul>
                        <li class="t" >${time.getHours() + ':' + time.getMinutes()+'0'}</li>
                        <li class="t"><img src="https://${hour.condition.icon}"/></li>
                        <li class="t">${Math.round(hour.temp_c)}°С</li>
                    </ul>
                </div>`

    day.insertAdjacentHTML('beforeend',forecastItemHour)
    })
}

