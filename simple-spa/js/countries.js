function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json); //this calls populateList(), it's a callback function
	});
} //end of loadData()

//declare globally
//these variables need to be accessed by several different functions

let listDiv; //the <div> that will hold the list of countries
let detailsDiv; //the <div> that will hold the details elements
let titleEl;
let capitalEl;
let populationEl;

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
	const countriesList=document.querySelector("#countries-list");
	countries.forEach(function(country){
		const newLi=document.createElement("li");
		newLi.textContent=country.name;
		newLi.addEventListener("click", createHandler(country), false)
		countriesList.appendChild(newLi);
	})
}
	
	

function goBack(){
	listDiv.classList.remove("hide");
	detailsDiv.classList.add("hide");
}

function init(){
	//grab hold of HTML elements
	listDiv =  document.querySelector("#list");
	detailsDiv =  document.querySelector("#details");
	titleEl = document.querySelector("#title");
	capitalEl = document.querySelector("#capital");
	populationEl = document.querySelector("#population");
	backBtn = document.querySelector("#backBtn");

	//add event listener for the back button
	backBtn.addEventListener("click",goBack,false);

	//hide the details view on page load
	detailsDiv.classList.add("hide");
	//make fetch request
	loadData("data/countries.json",populateList);
}

init();
