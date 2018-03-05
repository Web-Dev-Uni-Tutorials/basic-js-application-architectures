var ajax=function(url,success)
{
	var ajaxRequest = new XMLHttpRequest(); 
	var handleResponse=function()
	{
		if(ajaxRequest.readyState===4)
		{
			if(ajaxRequest.status===200)
			{
		    	var data=JSON.parse(ajaxRequest.responseText);
		    	success(data); //this will call populateList
			}
		}
	}
	ajaxRequest.addEventListener("readystatechange",handleResponse,false); 
	ajaxRequest.open('GET', url, true);
	ajaxRequest.send(null);
}


var titleEl;
var capitalEl;
var populationEl;


function populateContent(country)
{
	titleEl=document.getElementById("title");
	capitalEl=document.getElementById("capital");
	populationEl=document.getElementById("population");

	titleEl.innerHTML = country.name;
	capitalEl.innerHTML = country.capital;
	populationEl.innerHTML = country.population;
}


function init(){
	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	var urlParams = new URLSearchParams(window.location.search);
	var id = urlParams.get("id");
	ajax("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
}


init();