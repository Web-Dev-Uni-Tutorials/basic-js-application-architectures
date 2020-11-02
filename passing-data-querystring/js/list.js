function ajax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()

function populateList(countries)
{
	const countriesFragment = document.createDocumentFragment();
	countries.forEach(function(country){
		const newLi=document.createElement("li");
		const newLink=document.createElement("a");
		newLink.textContent=country.name;
		//adds a querystring to the URL e.g. details.html?id=2
		newLink.setAttribute("href","details.html?id="+country.id);
		newLi.appendChild(newLink);
		countriesFragment.appendChild(newLi);
	})
	const countriesList=document.getElementById("countries-list");
	countriesList.appendChild(countriesFragment);
}

function init(){
	ajax("data/countries.json",populateList);
}

init();
