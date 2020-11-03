function ajax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()




function populateContent(country)
{
	const titleEl=document.getElementById("title");
	const capitalEl=document.getElementById("capital");
	const continentEl=document.getElementById("continent");
	const populationEl=document.getElementById("population");
	titleEl.textContent = country.name;
	capitalEl.textContent = country.capital;
	continentEl.textContent = country.continent;
	populationEl.textContent = country.population;
}


function init(){
	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	ajax("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
}


init();
