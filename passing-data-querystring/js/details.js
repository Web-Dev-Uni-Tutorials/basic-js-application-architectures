function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()




function populateContent(vehicle)
{
	vehicle = vehicle.result.properties;
	console.log(vehicle);

	const titleEl = document.querySelector("#title");
	const modelEl = document.querySelector("#model");
	const manufacturerEl = document.querySelector("#manufacturer");
	const cargo_capacityEl = document.querySelector("#cargo_capacity");
	const crewEl = document.querySelector("#crew");
	titleEl.textContent = vehicle.name;
	modelEl.textContent = vehicle.model;
	manufacturerEl.textContent = vehicle.manufacturer;
	cargo_capacityEl.textContent = vehicle.cargo_capacity;
	crewEl.textContent = vehicle.crew;
}


function init(){
	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	loadData("https://www.swapi.tech/api/vehicles/"+id,populateContent);
}


init();
