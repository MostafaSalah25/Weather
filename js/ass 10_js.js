// https://www.weatherapi.com/
// API Key >>  bffe26306914457480a192012221101 
// search by cities>> https://api.weatherapi.com/v1/forecast.json?key=bffe26306914457480a192012221101&q=london&days=7

let searchInput = document.querySelector('.searchInput');
// today
let date =document.querySelector('.date');
let city = document.querySelector('.city');
let todayTemp = document.querySelector('.todayTemp');
let iconImg = document.querySelector(' .icon');
let text  =document.querySelector('.text');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');

// tomorrow 
let tomorrowIcon = document.querySelector('.tomorrowIcon');
let tomorrowMaxTemp = document.querySelector('.tomorrowMaxTemp');
let tomorrowMinTemp =document.querySelector('.tomorrowMinTemp');
let tomorrowText = document.querySelector('.tomorrowText');


//after tomorrow 
let afterTomorrowIcon = document.querySelector('.afterTomorrowIcon');
let afterTomorrowMaxTemp = document.querySelector('.afterTomorrowMaxTemp');
let afterTomorrowMinTemp = document.querySelector('.afterTomorrowMinTemp');
let afterTomorrowText = document.querySelector('.afterTomorrowText');

// day date
let dayToday = document.querySelector('.dayToday');
let dayTomorrow = document.querySelector('.dayTomorrow');
let dayAfterTomorrow = document.querySelector('.dayAfterTomorrow');

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = new Date ;

dayToday.innerHTML= days[day.getDay()] ;

let d = day.getDay()+ 1;
if( d != 7 ){
    
    dayTomorrow.innerHTML= days[d] ;
}
else{
    d=0;
    dayTomorrow.innerHTML= days[d] ;
}

let d2 = day.getDay()+ 2 ;
if( d2 <= 6 ){
    
    dayAfterTomorrow.innerHTML = days[d2] ; ;
}
else if (d2 == 7 ){
    d2 = 0;
    dayAfterTomorrow.innerHTML= days[d2] ;
}
else if (d2 == 8 ){
    d2 = 1;
    dayAfterTomorrow.innerHTML= days[d2] ;
}



//

if (searchInput.value == ""){
    getTemp ('cairo')
}

searchInput.addEventListener('keyup'  ,  function(){

        
    if (searchInput.value == ""){
        getTemp ('cairo');
    }

    else{
        getTemp (this.value);
    }
} )

async function getTemp (x) {
      
    let data = await fetch  (`https://api.weatherapi.com/v1/forecast.json?key=bffe26306914457480a192012221101&q=${x}&days=7`);
    
    let finalData  = await data.json();

    let { location , current , forecast } = finalData;
    
    //today

    date.innerHTML= location.localtime;
    city.innerHTML= `${location.name } / ${location.country } ` ;
    todayTemp.innerHTML = `${current.temp_c} <span><sup>o</sup>c</span> ` ;
    iconImg.src = ` https:${current.condition.icon} `;

    text.innerHTML = current.condition.text;
    humidity.innerHTML = ` Humidity  ${current.humidity}% `;
    wind.innerHTML = `<img src="images/icon-wind.png" class='pe-2' alt=""> ${current.wind_dir} ${current.gust_kph}  km/h `;

    // tomorrow 
    tomorrowIcon.src = `https:${forecast.forecastday[1].day.condition.icon}` ;
    tomorrowMaxTemp.innerHTML=  `${forecast.forecastday[1].day.maxtemp_c}  <span><sup>o</sup>c</span> ` ;
    tomorrowMinTemp.innerHTML=  `${forecast.forecastday[1].day.mintemp_c}  <span><sup>o</sup>c</span> ` ;
    tomorrowText.innerHTML= forecast.forecastday[1].day.condition.text;
        
    // after tomorrow 

    afterTomorrowMaxTemp.innerHTML=  `${forecast.forecastday[2].day.maxtemp_c}  <span><sup>o</sup>c</span> ` ;
    afterTomorrowMinTemp.innerHTML=  `${forecast.forecastday[2].day.mintemp_c}  <span><sup>o</sup>c</span> ` ;
    afterTomorrowText.innerHTML = forecast.forecastday[2].day.condition.text;
    afterTomorrowIcon.src = `https:${forecast.forecastday[2].day.condition.icon}`;

}

