
var ajax=function(url,success)
{
	var ajaxRequest = new XMLHttpRequest(); 
	var handleResponse=function()
	{
		if(ajaxRequest.readyState===4)
		{
			if(ajaxRequest.status===200)
			{
		    	var data=JSON.parse(ajaxRequest.responseText);
		    	success(data); //this will call populateList
			}
		}
	}
	ajaxRequest.addEventListener("readystatechange",handleResponse,false); 
	ajaxRequest.open('GET', url, true);
	ajaxRequest.send("test");
}
var navList;
var contentDiv;
var backLink = document.querySelector("#backLink");
var screens = document.querySelectorAll(".screen");

function populateList(countries)
{
	navList=document.getElementById("nav"); 
	contentDiv=document.getElementById("content"); 

	countries.forEach(function(country){
		var newLi=document.createElement("li"); 
		newLi.innerHTML=country.name; 
	    newLi.addEventListener("click", createHandler(country), false) 
		navList.appendChild(newLi); 
	})
}

function displayContent(country)
{
	contentDiv.innerHTML="<h2>"+country.name+"</h2><p>The capital city of "+country.name+" is "+country.capital+". "+country.name+" has a population of "+country.population+".</p>"; 
}

function createHandler(country)
{
	return function(event){
		changeScreen("screen2")
		//Add a new history entry see:- https://css-tricks.com/using-the-html5-history-api/
		history.pushState({"screen":"screen2","country":country},null, country.name+".html" );
		displayContent(country);
	}
}
function navigateBack(evnt)
{
	evnt.preventDefault();
	changeScreen("screen1")
	history.pushState({"screen":"screen1"}, null, "/countries.html" );
}

function changeScreen(id){
	//first hide all the screens
	for (var i = 0; i < screens.length; i++) {
	    screens[i].classList.add("inactive");
	}
	//next make one screen visible
	var activeScreen = document.querySelector("#"+id)
	activeScreen.classList.remove("inactive");
}

window.addEventListener('popstate', function(evnt) {
	changeScreen(evnt.state.screen);
	if(evnt.state.country){
		displayContent(evnt.state.country);
	}
});


function init(){
	ajax("data/countries.json",populateList);
	backLink.addEventListener("click",navigateBack);
	//add an initial histroy entry
	history.pushState({"screen":"screen1"},null, "/countries.html" );
}


init();



