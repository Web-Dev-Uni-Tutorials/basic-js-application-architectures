function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()

function createHandler(country)
{
	//this function uses a closure to associate data with a hyperlink
	return function(){
		//stores the id value into web storage
		sessionStorage.setItem("id",country.id);
	}
}

function populateList(countries)
{
	const countriesList=document.querySelector("#countries-list");
	countries.forEach(function(country){
		const newLi=document.createElement("li");
		const newLink=document.createElement("a");
		newLink.textContent=country.name;
		newLink.setAttribute("href","details.html");
		newLink.addEventListener("click", createHandler(country), false)
		newLi.appendChild(newLink);
		countriesList.appendChild(newLi);
	})
}

function init(){
	loadData("data/countries.json",populateList);
}

init();
