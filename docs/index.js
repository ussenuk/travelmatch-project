// Api key

const apiKey = "ZXZCmQDuIWv3Hbg7tasJpFxxhQbBuSsU";
const apiSecret ="YtUuEeVRFSIKuh9O"

//Define endpoint URL here 

const uriAuth = "https://test.api.amadeus.com/v1/security/oauth2/token" 

const endpointUrl = "https://test.api.amadeus.com/v1/reference-data/locations"

// let define the headers and body for our Amadeus authentication
const headerParameters ={
    'Content-Type':'application/x-www-form-urlencoded',
};

const bodyParameters = {
    grant_type:'client_credentials',
    client_id:'ZXZCmQDuIWv3Hbg7tasJpFxxhQbBuSsU',
    client_secret:'YtUuEeVRFSIKuh9O'

};

// define the ids of the elements

const searchInput = document.getElementById("searchInput");
const locationInfo = document.getElementById("locationInfo");

//init token
let token="";
  fetch(uriAuth, { method: 'POST', 
    headers: headerParameters, 
    body: 'grant_type=client_credentials&client_id=' + bodyParameters.client_id + '&client_secret=' + bodyParameters.client_secret
  })
  .then((res)=>{
    return res.json()
  })
  .then((json)=>{
    token=json.access_token;
    console.log(token);


    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click",()=>{
    const keyword = document.getElementById("searchInput").value;
    const name = document.getElementById("nameInput").value;
    const date = document.getElementById("searchDateInput").value;
    

    // console.log(keyword)
    
    getCityLocation(keyword).then((data)=>{
        // console.log(data);

        const city = data.data[0].detailedName;
        const country = data.data[0].address["countryName"];
        const zone = data.data[0].address["regionCode"];
        const analytics = data.data[0].analytics.travelers["score"];
        console.log(city);
        locationInfo.innerHTML =`Name: ${name} <br> Selected City : ${city} <br> Country : ${country} <br> Region : ${zone} <br> Destination Score: ${analytics} out of 100 <br> Date: ${date}` ;
        



    });
})
    

    //

  })


// Define query parameters here

const subType = "CITY";






//Function to make API call

// Function to make API call
async function getCityLocation(keyword) {


    // const keyword = 'PARIS';
    const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=${subType}&keyword=${keyword}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json','authorization': 'Bearer '+token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        // body:JSON.stringify(keyword)
    });

    return await response.json();

  }
  

  // APPLYING A CHANGE IN THE DOM

  // Calling function to change the change the image of the slideshow every two seconds
  let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


// APPLYING A SUBMIT IN THE DOM

const commentForm = document.getElementById("comment-form");
const searchForm = document.getElementById("search-form")
const posts= document.getElementById("posts");



commentForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    
    const commentsText = commentForm.commentsText.value;
    
    // var allInputs = document.querySelectorAll('input');
    // allInputs.forEach(singleInput => singleInput.value = '');

    document.getElementById("posts").innerHTML =` <br> ${commentsText}`;
    commentForm.reset();
    
})