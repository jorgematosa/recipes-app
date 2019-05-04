import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  api_url = environment.api_url;
  recipes_api = environment.recipes_api;

  constructor(private http: HttpClient) {}

  /**
   * Function that returns all recipes
   */
  public getRecipes() {
    const url = this.api_url + this.recipes_api;

    return this.http.get(url);
  }

  /**
   * Function that updates the recipe for isFavourite
   */
  public updateFavourite(recipeId, isFavourite) {
    const url = this.api_url + this.recipes_api + '/updateRecipe';
    let body = {
      id: recipeId,
      isFavourite: isFavourite
    };

    return this.http.post(url, body, { responseType: 'text' });
  }
}
