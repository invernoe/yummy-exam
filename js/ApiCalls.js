export class ApiCalls {

  static async searchByFirstLetter(letter) {
    //if search by first letter empty return empty meals object
    if(!letter) {
      return {meals: undefined};
    }
    
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async getMealDetailsByID(id) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async getAllCategories() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async getAllArea() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async getAllIngredients() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async searchByIngredient(ing) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async searchByCategory(cat) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async searchByArea(area) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  static async searchByName(name){
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let finalResponse = await response.json();
    return finalResponse
  }
}
  
