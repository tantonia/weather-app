const apiKey = '8bc5ef86fecd2100164e70a70eff36ae';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const currentDate = new Date()
const day = currentDate.getDay()
const date = currentDate.getDate()
const month = currentDate.getMonth()
const year = currentDate.getFullYear()

let dayStr = days[day]
let monthStr = months[month]
let dateStr = `${dayStr}, ${date} ${monthStr} ${year}`

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
})

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if (response.status === 404) {
        document.querySelector('.error > p').style.display = 'flex'
        document.querySelector('.weather').style.display = 'none'
    } else {
        let data = await response.json()
   
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp p").innerHTML = Math.round(data.main.temp) + "&#176C";
        document.querySelector(".temp_max").innerHTML = 'High ' + Math.round(data.main.temp_max) + "&#176C";
        document.querySelector(".temp_min").innerHTML = 'Low ' + Math.round(data.main.temp_min) + "&#176C"
        document.querySelector('.w-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.querySelector('.day').innerHTML = dateStr
    
        document.querySelector('.error > p').style.display = 'none'
        document.querySelector('.weather').style.display = 'block'
    }
}

    

