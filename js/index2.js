const apiKey = '';
const apiUrl = '';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const currentDate = new Date();
const day = currentDate.getDay();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

let dayStr = days[day];
let monthStr = months[month];
let dateStr = `${dayStr}, ${date} ${monthStr} ${year}`;

$(document).ready(function() {
    $('.search button').on('click', function() {
        checkWeather($('.search input').val());
    });
});

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        $('.error > p').css('display', 'flex');
        $('.weather').css('display', 'none');
    } else {
        let data = await response.json();
   
        $(".city").html(data.name);
        $(".temp p").html(Math.round(data.main.temp) + "&#176C");
        $(".temp_max").html('High ' + Math.round(data.main.temp_max) + "&#176C");
        $(".temp_min").html('Low ' + Math.round(data.main.temp_min) + "&#176C");
        $('.w-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        $('.day').html(dateStr);
        $(".humidity").html('Humidity ' + data.main.humidity + "%");
    
        $('.error > p').css('display', 'none');
        $('.weather').css('display', 'block');
    }
}
