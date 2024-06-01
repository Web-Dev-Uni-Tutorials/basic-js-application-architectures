# JavaScript Application Architectures
This repository contains some basic examples of strategies for building JavaScript applications.
  * Passing data using a query string
  * Passing data using web storage
  * A simple Single Page App (SPA)

Run the different examples (remember they need to be on a web server) and explore the code to see how they are working. Then try the following to test your understanding:

* Can you make changes to the JSON file(s)
  * Add another property e.g. *continent* for each country.
  * Modify the JavaScript code so that the continent information is displayed for each country along with capital and population.
  * It doesn't matter which example you use to do this.

* Can you use the SWAPI API that we used last week - https://www.swapi.tech/ to load the data instead of hard-coded JSON files.
  * You could use the web storage example and pass the URL of a vehicle instead of the id number of a country. e.g.  https://www.swapi.tech/api/vehicles for the first request, and then requests for specific species on the details page e.g. https://www.swapi.tech/api/vehicles/4.
  * Alternatively you could use the simple SPA example and just make a single request.

* Can you use the history API with the SPA example so that the browser's back and forward buttons work.


## Multi-page Apps - Passing Data to Another Page

### Using the Query String
The example here is *passing-data-querystring*.

* On page 1 an fetch request loads a list of countries stored as JSON
    ```javascript
        [
            {
                "id":1,
                "name":"England"
            },
            {
                "id":2,
                "name":"France"
            },  
            {
                "id":3,
                "name":"Germany"
            },
            {
                "id":4,
                "name":"USA"
            }
        ]
    ```
* The name of each country is made into a hyperlink e.g.
```html
<a href="details.html?id=3">Germany</a>
```
* On page 2 (details.html) the id value from the query string is used to make another fetch request.
    ```javascript
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    loadData("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
    ```
* Each countries details are stored as a separate JSON files, e.g. *country3.json*.
```javascript
    {
        "id":3,
        "name":"Germany",
        "capital":"Berlin",
        "population":80000000
    }
```

### Using Web Storage

The example here is *passing-data-web-storage*.

* Similar to above, on page 1 make an ajax request to load a list of countries stored as JSON.
* This time when the hyperlink is clicked,  the details for the chosen country is stored in web storage e.g.
    ```javascript
        sessionStorage.setItem("id",country.id);
    ```
* In *details.html* retrieve the selected country from web storage and use this to load another JSON file e.g.

```javascript
const id = sessionStorage.getItem("id");
loadData("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
```

## Single Page Apps
There is a single HTML page, but by some clever use of CSS and JavaScript the app feels like it features two separate pages. The reason for doing this is simple - the user moves between 'pages' faster which improves the user experience. JavaScript frameworks e.g. React, Angular, Vue.js are often based around the SPA model.

The example here is *simple-spa*.

This time there is a single JSON file containing all the data

```javascript
[
	{
		"id":1,
		"name":"England",
		"capital":"London",
		"population":61000000
	},
  ...
```

There are two div elements, *list* and *details*.

The list of countries is loaded into the *list* div. A closure is used to associate each hyperlink with data about a country.

```javascript
function createHandler(country)
{
	//this function uses a closure to associate data with a function
	return function(){
		titleEl.textContent = country.name;
		capitalEl.textContent = country.capital;
		populationEl.textContent = country.population;
		listDiv.classList.add("hide");
		detailsDiv.classList.remove("hide");
	}
}
```
When one of the countries is selected.
The country's details are displayed in the *details* div element.
We use CSS to hide/show the divs e.g.

```javascript
listDiv.classList.add("hide");
detailsDiv.classList.remove("hide");
```

### Running the example
* Download the example
* Run the example in a browser (it uses the ```fetch()``` API so it will need to be on a web server or it won't work)
* Have a look at the code. Like previous examples we have looked at, the DOM is used to dynamically inject content into the HTML page and change the content of existing elements. For example:

  ```javascript
  populationEl.textContent = country.population;
  ```

  To give the impression that the user has moved to a different page, CSS is used to hide or show different ```<div>``` elements. There is just a single CSS class ```hide``` which is added or removed from elements to hide or show them. For example:

  ```javascript
  listDiv.classList.add("hide");
  detailsDiv.classList.remove("hide");
  ```

Now try the following:
* Comment out the CSS in *index.html*. Re-run the example, see how the app really is just a single page.
* Like with the previous example, can you make some changes to the JSON file to test your understanding.
	* Add an additional country.
	* For each country, add an additional continent property.

### The History API
One problem with SPAs is that they 'break' the web. The user thinks they have moved to a different page when they haven't, as a result, the back/forward buttons in the browser no longer work like the user expects them to. One way around this problem is to use the History API - using JavaScript we can artificially create browser history entries e.g.

```javascript
history.pushState({"colour":"red"}, "Red page", "red.html");
```
The call to ```pushState()``` passes three parameters
* Data (an object) to store as part of the history entry. In this example ```{"colour":"red"}```.
* A title for the page. In this example ```"Red page"```.
* A URL to display in the browser. in this example ```red.html```.

We also need to know when the user has clicked the back button. We can listen for this *popstate* event, and update the page accordingly. For example:

```javascript
window.addEventListener('popstate', function(evnt) {
	//changes page to red
	document.body.style.backgroundColor=(evnt.state.colour);
});

```

If you change the branch of this repository to *solutions*, you can see a version of this simple SPA that makes use of the History API to provide a better user experience. The following links provide some additional information on the History API:-
* https://css-tricks.com/using-the-html5-history-api/
* https://developer.mozilla.org/en-US/docs/Web/API/History_API

### Closures
Two of these examples *passing-data-web-storage* and *simple-spa* make use of a closure to associate data with a dynamically generated hyperlink. An explanation of closures can be found here https://github.com/CHT2531/functional-programming/blob/master/notes.md#closures.
