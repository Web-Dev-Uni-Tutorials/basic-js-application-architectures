function ajax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()

//declare globally
//these variables need to be accessed by several different functions

var listDiv; //the <div> that will hold the list of countries
var detailsDiv; //the <div> that will hold the details elements
var titleEl;
var capitalEl;
var populationEl;

function createHandler(country)
{
	//this function uses a closure to associate data with a function
	return function(){
		titleEl.textContent = country.name;
		capitalEl.textContent = country.capital;
		populationEl.textContent = country.population;
		listDiv.classList.add("hide");
		detailsDiv.classList.remove("hide");
	}
}

function populateList(countries)
{
	const countriesFragment = document.createDocumentFragment();
	countries.forEach(function(country){
		const newLi=document.createElement("li");
		newLi.textContent=country.name;
		newLi.addEventListener("click", createHandler(country), false)
		countriesFragment.appendChild(newLi);
	})
	const countriesList=document.getElementById("countries-list");
	countriesList.appendChild(countriesFragment);
}
function goBack(){
	listDiv.classList.remove("hide");
	detailsDiv.classList.add("hide");
}

function init(){
	//grab hold of HTML elements
	listDiv =  document.getElementById("list");
	detailsDiv =  document.getElementById("details");
	titleEl = document.getElementById("title");
	capitalEl = document.getElementById("capital");
	populationEl = document.getElementById("population");
	backBtn = document.querySelector("#backBtn");

	//add event listener for the back button
	backBtn.addEventListener("click",goBack,false);

	//hide the details view on page load
	detailsDiv.classList.add("hide");
	//make Ajax request
	ajax("data/countries.json",populateList);
}

init();
