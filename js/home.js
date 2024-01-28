import { UserInterface } from "./UserInterface.js";
import { ApiCalls } from "./ApiCalls.js";
import { ContactRegex } from "./contactRegex.js";

export class Home {
  constructor() {
    this.ui = new UserInterface();
    this.displayMealsOnStartup(true);
    this.setupNavbarClickFunctions();
    ContactRegex.setupRegex();
  }

  setupNavbarClickFunctions() {
    $("#categoriesTab").on("click", () => {
      this.fetchCategories();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });

    $("#contactUsTab").on("click", () => {
      this.ui.displayContactUs();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });

    $("#searchTab").on("click", () => {
      this.fetchSearch();
      this.ui.closeNavbar();
    });

    $("#areaTab").on("click", () => {
      this.fetchArea();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });
    $("#ingredientsTab").on("click", () => {
      this.fetchIngredients();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });
  }

  fetchIngredients() {
    this.ui.showOverlay();
    ApiCalls.getAllIngredients().then((res) => {
      this.ui.displayIngredients(res.meals.slice(0, 20));
      this.ui.hideOverlay();
      this.setupIngredientsOnClick();
    });
  }

  setupIngredientsOnClick() {
    $(".ingredient-item").click((e) => {
      let ingredient = $(e.currentTarget).children("h3").text();
      this.searchByIngredientUsingId(ingredient);
    });
  }

  searchByIngredientUsingId(id) {
    ApiCalls.searchByIngredient(id).then((res) => {
      this.ui.showOverlay();
      this.ui.displayMeals(res.meals);
      this.setupMealOnclick();
      this.ui.hideOverlay();
    });
  }

  fetchArea() {
    this.ui.showOverlay();
    ApiCalls.getAllArea().then((res) => {
      this.ui.displayArea(res.meals);
      this.ui.hideOverlay();
      this.setupAreaOnClick();
    });
  }

  setupAreaOnClick() {
    $(".area-item").click((e) => {
      let area = $(e.currentTarget).children().children().text();
      this.searchByAreaUsingId(area);
    });
  }

  searchByAreaUsingId(id) {
    ApiCalls.searchByArea(id).then((res) => {
      this.ui.showOverlay();
      this.ui.displayMeals(res.meals);
      this.setupMealOnclick();
      this.ui.hideOverlay();
    });
  }

  displayMealsOnStartup(state) {
    this.ui.showOverlay(state);
    ApiCalls.searchByName("").then((res) => {
      this.ui.displayMeals(res.meals);
      this.setupMealOnclick();
      this.ui.hideOverlay();
    });
  }

  fetchCategories() {
    this.ui.showOverlay();
    ApiCalls.getAllCategories().then((res) => {
      this.ui.displayCategories(res.categories);
      this.ui.hideOverlay();
      this.setupCategoryOnClicks();
    });
  }

  fetchSearch() {
    this.ui.displaySearch();
    this.setupSearch();
    this.setupFirstLetterSearch();
  }

  setupSearch() {
    $("#nSearch").on("keyup", () => {
      //show loading overlay before making api call
      this.ui.showOverlay();
      ApiCalls.searchByName($("#nSearch").val()).then((res) => {
        this.ui.displayMeals(res.meals, true);
        this.setupMealOnclick();
        //hide loading overlay after api call is done
        this.ui.hideOverlay();
      });
    });
  }

  setupFirstLetterSearch() {
    $("#flSearch").keyup(() => {
      //show loading overlay before making api call
      this.ui.showOverlay();
      ApiCalls.searchByFirstLetter($("#flSearch").val()).then((res) => {
        this.ui.displayMeals(res.meals, true);
        this.setupMealOnclick();
        //hide loading overlay after api call is done
        this.ui.hideOverlay();
      });
    });
  }

  setupCategoryOnClicks() {
    //setup on click for each categorry
    $(".categoryItem").on("click", (e) => {
      //get the text of the category
      let categoryText = $(e.currentTarget)
        .children()
        .children()
        .eq(1)
        .children()
        .text()
        .trim();
      ApiCalls.searchByCategory(categoryText).then((res) => {
        this.ui.showOverlay();
        this.ui.displayMeals(res.meals);
        this.setupMealOnclick();
        this.ui.hideOverlay();
      });
    });
  }

  setupMealOnclick() {
    $(".meal").click((e) => {
      let id = $(e.target).parent().data("mealId");
      this.ui.showOverlay();
      ApiCalls.getMealDetailsByID(id).then((result) => {
        this.ui.displayDetails(result.meals[0]);
        this.ui.hideOverlay();
      });
    });
  }
}
