
# Single Page Apps
This repository contains some basic examples of strategies for building JavaScript applications.

## Passing data to another page

### Using the query string
The example here is *passing-data-querystring*.

* On page 1 make an ajax request to load a list of countries stored as JSON
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
* Make the name of each country into a hyperlink e.g.
```html
<a href="details.html?id=3">Germany</a>
```
* On page 2 (details.html) get hold of the id value from the query string
    - This can be done using URLSearchParams
    ```javascript
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id); //displays 3
    ```
* Make an Ajax request for the full details for the country. Each countries details are stored as a separate JSON files, e.g. *country3.json*.
    ```javascript
        {
            "id":3,
            "name":"Germany",
            "capital":"Berlin",
            "population":80000000
        }
    ```

### Using web storage

The example here is *passing-data-local-storage*.

* Similar to above, on page 1 make an ajax request to load a list of countries stored as JSON. This time the data contains the full details for each country e.g.
    ```[
    {
        "id":1,
        "name":"England",
        "capital":"London",
        "population":61000000
    },
    {
        "id":2,
        "name":"France",
        "capital":"Paris",
        "population":65000000
    },  
    {
        "id":3,
        "name":"Germany",
        "capital":"Berlin",
        "population":80000000
    },
    {
        "id":4,
        "name":"USA",
        "capital":"Washington",
        "population":321000000
    }
]

* Make the name of each country into a hyperlink (this time there isn't any need for a query string) e.g.
    ```html
        <a href="details.html">Germany</a>
    ```
    
* When the hyperlink is clicked, store the details for the chosen country in web storage e.g.
    ```javascript
        sessionStorage.setItem("country",JSON.stringify(country));
    ```
* In *details.html* retrieve the selected country from web storage and display the details e.g.
    ```javascript
        var country = JSON.parse(sessionStorage.getItem("country"));
    ```

## Single Page Apps

### A simple example

The example here is *simple-spa*.

This is a really simple example, so no Ajax, it just shows how we can switch 'screens'.

* Each different page or screen of the app is defined inside a single HTML page as separate div elements e.g.
    ```html
    <div class="container">
        <div class="screen inactive" id="screen1">Screen 1</div>
        <div class="screen inactive" id="screen2">Screen 2</div>
        <div class="screen inactive" id="screen3">Screen 3</div>
    </div>
    ```

    By hiding and showing the div elements we give the impression the user has navigated to a different page. 
* The CSS is used to change the opacity of the divs to make them hide/show
    ```css
        .container{
                position:relative;
            }
        .screen{
            position:absolute;
            top:0px;
            left:0px;
            opacity:1;
            transition:all 0.5s;
            background-color:#00dddd;
            width:400px;
            height:500px;
        }
        .inactive{
            top:100px;
            opacity:0;
        }
    ```

    JavaScript adds/removes the CSS classes
    ```javascript
        //first hide all the screens
        for (var i = 0; i < screens.length; i++) {
            screens[i].classList.add("inactive");
        }
        //next make one screen visible
        var activeScreen = document.querySelector("#"+id)
        activeScreen.classList.remove("inactive");
    ```

### Using the history API
The problem with the above is that the browser's back button will no longer work (the user thinks they have changed page but they haven't). 

The history API can be used to artificially add history entries so that the browser's back button works as expected for the user. 
* https://developer.mozilla.org/en-US/docs/Web/API/History_API
* https://css-tricks.com/using-the-html5-history-api/

The example here is *simple-history-api*

When a hyperlink is clicked we artificially add a history entry e.g.
```javascript
history.pushState({"screen":"screen2"}, "screen2", "screen2.html");
```
* The first parameter is data to store as part of the history item
* The second parameter is title of the page 
* The third parameter is the text to display in the URL field

When the user clicks the back button *popstate* event is triggered 
```
window.addEventListener('popstate', function(evnt) {
    console.log(evnt);
    changeScreen(evnt.state.screen);
});
```

Using the event object we can retrieve information about the histroy entry and display the relevant screen

### Combining the history API with Ajax
The final example shows an application built using the history api and ajax. Obviously there is more going on so it's a bit more complex.

The example here is *spa-with-ajax-and-history*.