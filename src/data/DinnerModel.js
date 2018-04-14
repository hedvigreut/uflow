const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = localStorage.getItem('guests')||4;
  let observers = [];
  let dishMenu = JSON.parse(sessionStorage.getItem("dishMenu"))||[];
  let activeDish = null;
  let type = "all";
  let filter = "";

  this.setType = function (newType) {
    type = newType;
    notifyObservers();
  }

  this.getType = function () {
    return type;
  }

  this.setFilter = function (newFilter) {
    filter = newFilter;
    notifyObservers();
  }

  this.getFilter = function () {
    return filter;
  }

  this.setActiveDish = function (dish) {
    activeDish = dish;
    notifyObservers();
  }

  this.getActiveDish = function () {
    return activeDish;
  }

  this.setNumberOfGuests = function (num) {
    if (num >= 1) {
      numberOfGuests = num;
      localStorage.setItem('guests', num);
      notifyObservers();
    }
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.addDishToMenu = function (dish) {
    for (var i = 0; i < dishMenu.length; i++) {
      if (dish.title === dishMenu[i].title) {
        this.removeDishFromMenu(dishMenu[i].title);
        //notifyObservers();
      }
    }
    dishMenu.push(dish);
    this.setMenu();
    notifyObservers();
  }

  this.getFullMenu = function () {

    return dishMenu;
  }

  // API Calls

  this.getTotalMenuPrice = function () {
    var totalPrice = 0;
    for (var i = 0; i < dishMenu.length; i++) {
      totalPrice += dishMenu[i].extendedIngredients.length;
    }
    return totalPrice * numberOfGuests;
  }

  this.removeDishFromMenu = function (dishTitle) {
    for (var i = 0; i < dishMenu.length; i++) {
      if (dishTitle === dishMenu[i].title) {
        dishMenu.splice(i, 1);
      }
    }
    this.setMenu();
    notifyObservers();
  }

  this.getAllDishes = function (type, filter) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type=' + type + '&query=' + filter
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id) {
   const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information'
   return fetch(url, httpOptions)
     .then(processResponse)
     .catch(handleError)
   }

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern
  this.setMenu = function () {
    sessionStorage.setItem("dishMenu", JSON.stringify(dishMenu));
    notifyObservers();
  }

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
