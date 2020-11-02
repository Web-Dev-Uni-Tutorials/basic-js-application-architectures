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
  * You could use the web storage example and pass the URL of an species instead of the id number of a country. e.g.  https://www.swapi.tech/api/species for the first request, and then requests for specific species on the details page e.g. https://www.swapi.tech/api/species/3.
  * Alternatively you could use the simple SPA example and just make a single request.

* Can you use the history API with the SPA example so that the browsers back and forward buttons work.


## Multi-page Apps - Passing data to another page

### Using the query string
The example here is *passing-data-querystring*.

* On page 1 an ajax request loads a list of countries stored as JSON
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
* On page 2 (details.html) the id value from the query string is used to make another Ajax request.
    ```javascript
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    ajax("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
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

### Using web storage

The example here is *passing-data-web-storage*.

* Similar to above, on page 1 make an ajax request to load a list of countries stored as JSON.
* This time when the hyperlink is clicked,  the details for the chosen country is stored in web storage e.g.
    ```javascript
        sessionStorage.setItem("id",country.id);
    ```
* In *details.html* retrieve the selected country from web storage and use this to load another JSON file e.g.

```javascript
const id = sessionStorage.getItem("id");
ajax("data/country"+id+".json",populateContent); //request a JSON file e.g. country3.json
```

## Single Page Apps

### A simple example

The example here is *simple-spa*.

A closure is used to associate each hyperlink with data about a country.

There are two div elements, *list* and *details*. We use CSS to hide/show the divs e.g.

```javascript
listDiv.classList.remove("hide");
detailsDiv.classList.add("hide");
```
