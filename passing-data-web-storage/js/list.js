function ajax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of ajax()

function createHandler(country)
{
	//this function uses a closure to associate data with a hyperlink
	return function(){
		sessionStorage.setItem("id",country.id);
	}
}

function populateList(countries)
{
	const countriesFragment = document.createDocumentFragment();
	countries.forEach(function(country){
		const newLi=document.createElement("li");
		const newLink=document.createElement("a");
		newLink.textContent=country.name;
		newLink.setAttribute("href","details.html");
		newLink.addEventListener("click", createHandler(country), false)
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
