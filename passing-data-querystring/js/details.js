function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()




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
	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	loadData("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
}


init();
