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
    "alfredo",
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
    "Tri-tip",
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

// example request
function handleButtonClick() {
  $('button').on('click', function(event) {
    $.get("https://api.edamam.com/search?app_key=d1dfe212e6e24332bd7f41e23aa2f5b3&app_id=a217352d&q=" + term).done(function (data) {
      renderResults(data);
    
    });
    
  })
}


function handleMealClick () {
  $('.meal').on('click', function(event) {
    var RECIPE_URL = escape(($(event.currentTarget).data('uri')))
    $.get("https://api.edamam.com/search?app_key=d1dfe212e6e24332bd7f41e23aa2f5b3&app_id=a217352d&r=" + RECIPE_URL).done(function (data) {
        renderMeal(data);
    })
  })
 
}


function handleCloseModalClick() {
  $('.close-modal').on('click', function(event) {
    $('.modal').css('display', 'none')
  })

  var modal = document.getElementById('myModal');
  window.onclick = function(event) {
    if (event.target == myModal) {
        myModal.style.display = "none";
    }
  }
}


function renderResults(data) {
  var listItems = data.hits.slice(0,9).map((item) => {
    return   `<div class='col-4'>
      <div class='recipe-card'>
        <h4 class='recipe-title'>${item.recipe.label}</h4>
        <img class='results-img rounded' src=${item.recipe.image}>
        <div class='recipe-card-actions'>
          <button data-uri=${item.recipe.uri} type='button' class='view-ingredients btn btn-sm btn-primary meal'>View Ingredients</button>
          
      </div>
    </div>      
  </div>`
  
  })


  $('.js-results').html(listItems);
  
  handleMealClick();
}


function renderMeal(data) {
  var resultElement = ''
  var elementID = $('.modal-list')
  $('.modal').css('display', 'block');
  data[0].ingredientLines.forEach(function(item) {
    resultElement += `<li>${item}</li>`
  });
  $('.modal-title').text(data[0].label);
  $('.modal-footer a').attr('href', data[0].url);
  elementID.html(resultElement)
  handleCloseModalClick();
}

$(document).ready(function() {
  handleButtonClick();
})




