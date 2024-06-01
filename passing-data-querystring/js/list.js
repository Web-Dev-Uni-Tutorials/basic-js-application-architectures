function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()

function populateList(vehicles)
{
	const vehiclesList = document.querySelector("#vehicles-list");
	vehicles.results.forEach(function (vehicle) {
		const newLi = document.createElement("li");
		const newLink = document.createElement("a");
		console.log(vehicle);
		newLink.textContent = vehicle.name;
		//adds a querystring to the URL e.g. details.html?id=2
		newLink.setAttribute("href", "details.html?id=" + vehicle.uid);
		newLi.appendChild(newLink);
		vehiclesList.appendChild(newLi);
	})
} //end of populateList, do not remove this line

function init(){
	loadData("https://www.swapi.tech/api/vehicles/",populateList);
}

init();
