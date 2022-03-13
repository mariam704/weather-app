/* Global Variables */
//to turn tempertuer to feharanet degree
const unitType = '&units=imperial';
const countryCode = 'us';
//our zipcode start from >=98104
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
// my api key
const apiKey  = 'appid=78f076f94f76835a328501ac8fb5b4ff';
//date
const d = new Date();
const currentDay = d.getDate();
const currentMonth = d.getMonth() + 1;
const currentYear = d.getFullYear();
const newDate = `${currentDay}.${currentMonth}.${currentYear}`;
//access generat button
const generateButtonElem = document.getElementById('generate');
// get zip input and textarea
const zipInputElem = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const content = document.getElementById("content");
const date = document.getElementById("date");
const tempElem = document.getElementById("temp");
//promise >==wait untill fet date then execut code
const fetchWeatherInfo = async(baseURL,zipCode, apiKey) =>{
//wait untill get zipcode and basurl 
  const fetching = await fetch(baseURL+zipCode+"&"+apiKey+unitType);
if(zipCode==""){
  alert("the zipcode cant be empty  please write your zipcode");
}
   try{
     const result = await fetching .json();
    return result;
    //if the code dosent execut make an error msg
  }catch(err){
     console.log(err);
  }
}
//function to post data 
async function postData(data = {}){

   const sendPostRequest = await fetch("/add", {
      method: "POST",
     credentials: "same-origin",
     headers:{
          "Content-Type": "application/json"
       },
    body: JSON.stringify(data)
   });
   try{
     //look if code =true >post data 
       const response= await sendPostRequest.json();
      return response;
  }catch(err){
    console.log(err)
  }
}

const showInfo = async() =>{
      const fetchingData = await fetch("/all");
     try{
       const data = await fetchingData.json();
       tempElem.innerHTML = Math.round(data.temp)+"degree";
       date.innerHTML = data.date;
      content.innerHTML = data.feelings;
   }catch(err){
       console.log(err)
  }
 }

generateButtonElem.addEventListener("click", function(){
  const zipCode = zipInputElem.value;
  const feelingsValue = feelings.value;
   fetchWeatherInfo(baseURL+"zip=", zipCode, apiKey)
   .then(data =>{
         postData({date: newDate, temp: data.main.temp, feelings: feelingsValue})
   })
   .then(() =>{
    showInfo();
 })
})

//addevent to show our data when user click button
generateButtonElem.addEventListener('click', showInfo);

