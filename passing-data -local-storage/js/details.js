

var titleEl;
var capitalEl;
var populationEl;


function populateContent(country)
{
	titleEl=document.getElementById("title");
	capitalEl=document.getElementById("capital");
	populationEl=document.getElementById("population");

	titleEl.innerHTML = country.name;
	capitalEl.innerHTML = country.capital;
	populationEl.innerHTML = country.population;
}


function init(){
	var country = JSON.parse(sessionStorage.getItem("country"));
	populateContent(country);
}


init();