var randomSearchTerm = [
    "Asian",
    "breakfast", 
    "Italian", 
    "Chinese", 
    "French", 
    "Thai", 
    "Vietnamese", 
    "American", 
    "Mexican", 
    "asparagus",
    "apples",
    "avocado",
    "alfalfa",
    "acorn squash",
    "almond",
    "arugala",
    "artichoke",
    "applesauce",
    "asian noodles",
    "antelope",
    "ahi tuna",
    "albacore tuna",
    "Apple juice",
    "Avocado roll",
    "Bruscetta",
    "bacon",
    "black beans",
    "bagels",
    "baked beans",
    "bean",
    "beans",
    "BBQ",
    "bison",
    "barley",
    "beef",
    "beer",
    "bisque",
    "bluefish",
    "bread",
    "broccoli",
    "buritto",
    "Cabbage",
    "cake",
    "carrots",
    "carne asada",
    "celery",
    "cheese",
    "chicken",
    "catfish",
    "chips",
    "chocolate",
    "chowder",
    "clams",
    "coffee",
    "cookies",
    "corn",
    "cupcakes",
    "crab",
    "curry",
    "cereal",
    "chimichanga",
    "dates",
    "dips",
    "duck",
    "dumplings",
    "donuts",
    "eggs",
    "enchilada",
    "eggrolls",
    "English muffins",
    "edamame",
    "fajita",
    "falafel",
    "fish",
    "franks",
    "fondu",
    "French toast",
    "French dip",
    "Fries",
    "Garlic",
    "ginger",
    "gnocchi",
    "goose",
    "granola",
    "grapes",
    "green beans",
    "Guancamole",
    "gumbo",
    "grits",
    "Graham crackers",
    "ham",
    "halibut",
    "hamburger", 
    "cheeseburger",
    "honey",
    "hot dogs",
    "huevos rancheros",
    "hash browns",
    "hot dogs",
    "haiku roll",
    "hummus",
    "ice cream",
    "Irish stew",
    "Indian",
    "Italian bread",
    "jambalaya",
    "jam",
    "jelly",
    "jerky",
    "jalapeño",
    "kale",
    "kabobs",
    "ketchup",
    "kiwi",
    "kidney beans",
    "kingfish",
    "lobster",
    "Lamb",
    "Linguine",
    "Lasagna",
    "Meatballs",
    "Moose",
    "Milk",
    "Milkshake",
    "Noodles",
    "Nuts",
    "Ostrich",
    "Pasta",
    "Pizza",
    "Pepper",
    "Pepperoni",
    "Porter",
    "Pancakes",
    "Quesadilla",
    "Quiche",
    "Reuben",
    "Roast",
    "Sandwich",
    "Salmon",
    "Salami",
    "Soup",
    "Spinach",
    "Spaghetti",
    "Sushi",
    "Tater tots",
    "Tacos",
    "Toast",
    "Vegetables",
    "Vegetarian", 
    "Veggies",
    "Venison",
    "Waffles",
    "Wine",
    "Walnuts",
    "Yogurt",
    "Ziti",
    "Zucchini"]
var foodToForkBaseURL = 'http://food2fork.com/api/search'
var foodToForkAPIKey = '2b6b377e09f256ce049a0984607f1f37'
var term = randomSearchTerm[Math.floor(Math.random()* randomSearchTerm.length)]

function getDataFromAPI(callback) {
  var query = {
    key: foodToForkAPIKey,
    q: '',
    sort: 't',
    callback: ''
  }
  $.getJSON(foodToForkBaseURL, query, callback);
}

// function getCORS(url, success) {
//     var xhr = new XMLHttpRequest();
//     if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
//     xhr.open('GET', url);
//     xhr.onload = success;
//     xhr.send();
//     return xhr;
// }

// example request
function handleButtonClick() {
  $('button').on('click', function(event) {
    // console.log('click');
    // $(event.currentTarget).hide()
    $.get("https://api.edamam.com/search?app_key=d1dfe212e6e24332bd7f41e23aa2f5b3&app_id=a217352d&q=" + term).done(function (data) {
      renderResults(data);
    
    });
    
  })
}

function handleMealClick () {
  console.log('mealClick')
  $('.meal').on('click', function(event) {
    console.log('meal')
    var RECIPE_URL = escape($(event.currentTarget).data('uri'))
    console.log(RECIPE_URL)
    $.get("https://api.edamam.com/search?app_key=d1dfe212e6e24332bd7f41e23aa2f5b3&app_id=a217352d&r=" + RECIPE_URL).done(function (data) {
      console.log(data)
      // renderResults(data);
      // if (data.recipe) {
      //   return "<li>" + data.recipe.label + data.recipe.image + "</li>"
      // }
    })
  })
}
function renderResults(data) {
  console.log(data)
  var listItems = data.hits.map((item) => {
    console.log("renderResults")
    return   `<div class='recipe-card col-sm-6 col-md-6 col-lg-4 text-center'>
    <h4 class='recipe-title'>${item.recipe.label}</h4>
    <img class='results-img rounded' src=${item.recipe.image}>
    <p class='prep-time'>Ready in __ minutes!</p>
    <div class='recipe-card-actions text-center'>
      <button type='button' class='view-ingredients btn btn-sm btn-primary'>View Ingredients and Instructions</button>
      <button class='add-to-list btn btn-sm btn-primary'>Add ingredients to shopping list</button>
    </div>      
  </div>`
  
  })


  $('.js-results').html(listItems);
  // $('.js-ul').html(listItems[Math.floor(Math.random() * randomSearchTerm.length)])
  handleMealClick();
}
function renderMeal() {

}

$(document).ready(function() {
  handleButtonClick();
})
 