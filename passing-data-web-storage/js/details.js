function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()

function populateContent(data)
{
	const vehicle = data.result.properties;
	
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
	//get the chosen vehicle's id from session storage
	const id = sessionStorage.getItem("id");
	loadData("https://www.swapi.tech/api/vehicles/"+id,populateContent);
}


init();
