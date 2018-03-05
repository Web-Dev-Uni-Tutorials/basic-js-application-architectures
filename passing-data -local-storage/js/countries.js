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


var navList;
var contentDiv;

function createHandler(country)
{
	return function(){
		sessionStorage.setItem("country",JSON.stringify(country));
	}
}


function populateList(countries)
{
	navList=document.getElementById("nav");
	contentDiv=document.getElementById("content");

	countries.forEach(function(country){
		var newLi=document.createElement("li");
		var newLink=document.createElement("a");
		newLink.innerHTML=country.name;
		newLink.setAttribute("href","details.html");
		newLink.addEventListener("click", createHandler(country), false)
		newLi.appendChild(newLink);
		navList.appendChild(newLi);
	})
}

function init(){
	ajax("data/countries.json",populateList);
}

init();