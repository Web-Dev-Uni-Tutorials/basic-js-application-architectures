function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()

function populateContent(country)
{
	const titleEl=document.querySelector("#title");
	const capitalEl=document.querySelector("#capital");
	const populationEl=document.querySelector("#population");
	titleEl.textContent = country.name;
	capitalEl.textContent = country.capital;
	populationEl.textContent = country.population;
}

function init(){
	//get the chosen country's id from session storage
	const id = sessionStorage.getItem("id");
	loadData("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
}


init();
