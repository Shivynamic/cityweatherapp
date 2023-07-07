const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityname');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status')
const temp_real_val = document.getElementById('temp_real_val')
const datahide = document.querySelector('.middle_layer')
const curDay = document.getElementById("day");
const curDate = document.getElementById('today_date');

const getInfo = async (event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText =`Please write name of city before search`;
        datahide.classList.add('data_hide');
 }
else{   try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=985d6b3b066fa113eb707ae175da7c58`;
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];

        city_name.innerText =`${arrData[0].name} , ${arrData[0].sys.country}`; 
        temp_real_val.innerText = arrData[0].main.temp;
        // temp_status.innerText = arrData[0].weather[0].main;

        const tempMood = arrData[0].weather[0].main

        if(tempMood=="Clear"){
            temp_status.innerHTML = '<i class="fas fa-sun" style="color:#yellow"></i>'
        }else if(tempMood=="Clouds"){
            temp_status.innerHTML = '<i class="fas fa-cloud" style="color:#white"></i>'
        }else if(tempMood=="Rainy"){
            temp_status.innerHTML = '<i class="fas fa-cloud-rain" style="color:#a40b0be"></i>'
        }else{
            temp_status.innerHTML = '<i class="fas fa-sun" style="color:#white"></i>'
        }
        
        datahide.classList.remove('data_hide');

    }catch{
        city_name.innerText =`Please enter city name properly`;
        datahide.classList.add('data_hide');
    }
 }   
}

const getCurrentDay = ()=>{
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime= ()=> {
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]    
var now = new Date();
var month = months[now.getMonth()];
var date = now.getDate();

let hours = now.getHours();
let mins = now.getMinutes();

let perios = "AM";

if (hours>11){
    perios = "PM";
    if(hours>12) hours-=12;
}if(mins<10){
    mins = "0"+mins;
}

return `${month} ${date}`
}


curDay.innerText= `${getCurrentDay()}`;
curDate.innerText =`${getCurrentTime()}`






submitBtn.addEventListener('click',getInfo)