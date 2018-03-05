var hyperlinks = document.querySelectorAll("a");
var screens = document.querySelectorAll(".screen");


function changeScreen(id){
	//first hide all the screens
	for (var i = 0; i < screens.length; i++) {
	    screens[i].classList.add("inactive");
	}
	//next make one screen visible
	var activeScreen = document.querySelector("#"+id)
	activeScreen.classList.remove("inactive");
}

function clickHandler(evnt){
	evnt.preventDefault(); //stop the default hyperlink
	var id = evnt.target.getAttribute("data-show"); //get the id of the screen to make visible
	changeScreen(id)
}

function init(){
	for (var i = 0; i < hyperlinks.length; i++) {
	    hyperlinks[i].addEventListener('click', clickHandler,false);
	}
	changeScreen("screen1");
}
init();