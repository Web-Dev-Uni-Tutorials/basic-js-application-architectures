function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()

function populateList(countries)
{
	const countriesList=document.querySelector("#countries-list");
	countries.forEach(function(country){
		const newLi=document.createElement("li");
		const newLink=document.createElement("a");
		newLink.textContent=country.name;
		//adds a querystring to the URL e.g. details.html?id=2
		newLink.setAttribute("href","details.html?id="+country.id);
		newLi.appendChild(newLink);
		countriesList.appendChild(newLi);
	})
} //end of populateList, do not remove this line

function init(){
	loadData("data/countries.json",populateList);
}

init();
