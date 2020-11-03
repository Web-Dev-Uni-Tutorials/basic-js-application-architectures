function ajax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()

function populateContent(singleSpecies)
{
	console.log(singleSpecies);
	const nameEl=document.getElementById("name");
	const lifespanEl=document.getElementById("lifespan");
	nameEl.textContent = `Name:${singleSpecies.name}`;
	lifespanEl.textContent = `Lifespan:${singleSpecies.average_lifespan}`;

}

function init(){
	//get the chosen country's id from session storage
	const url = sessionStorage.getItem("url");
	ajax(url,populateContent); //request a JSON file e.g. country3.json
}


init();
