function ajax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()

function createHandler(singleSpecies)
{
	//this function uses a closure to associate data with a hyperlink
	return function(){
		sessionStorage.setItem("url",singleSpecies.url);
	}
}

function populateList(json)
{
	console.log(json)
	const species = json.results;
	const speciesFragment = document.createDocumentFragment();
	species.forEach(function(singleSpecies){
		const newLi=document.createElement("li");
		const newLink=document.createElement("a");
		newLink.textContent=singleSpecies.name;
		newLink.setAttribute("href","details.html");
		newLink.addEventListener("click", createHandler(singleSpecies), false)
		newLi.appendChild(newLink);
		speciesFragment.appendChild(newLi);
	})
	const speciesList=document.getElementById("species-list");
	speciesList.appendChild(speciesFragment);
}

function init(){
	ajax("https://swapi.dev/api/species",populateList);
}

init();
