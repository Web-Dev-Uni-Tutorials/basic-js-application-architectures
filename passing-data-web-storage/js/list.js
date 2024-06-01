function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()

function createHandler(vehicle)
{
	//this function uses a closure to associate data with a hyperlink
	return function(){
		//stores the id value into web storage
		sessionStorage.setItem("id",vehicle.uid);
	}
}

function populateList(vehicles)
{
	const vehiclesList = document.querySelector("#vehicles-list");
	vehicles.results.forEach(function (vehicle) {
		const newLi = document.createElement("li");
		const newLink = document.createElement("a");
		console.log(vehicle);
		newLink.textContent = vehicle.name;
		newLink.setAttribute("href", "details.html");
		newLink.addEventListener("click", createHandler(vehicle), false);
		newLi.appendChild(newLink);
		vehiclesList.appendChild(newLi);
	})
}

function init(){
	loadData("https://www.swapi.tech/api/vehicles/",populateList);
}

init();
