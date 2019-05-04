import { Recipe } from './../shared/recipe';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.css']
})
export class RecipesHomeComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  recipeNameSearchForm = new FormControl('');
  onlyFavourites = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getRecipes().subscribe((data: any) => {
      this.recipes = data;
      this.filterRecipesByName();
    });
  }

  /**
   * Backend request to update the recipe (isFavourite) and updates the current stored object in Browser
   */
  favourites(recipe: Recipe) {
    this.dataService
      .updateFavourite(recipe[1], !recipe[0].isFavourite)
      .subscribe(data => {
        // console.log(data);
        recipe[0].isFavourite = !recipe[0].isFavourite;
      });
  }

  /**
   * Function to filter the recipes by favourite
   */
  filterRecipesByFavourite() {
    this.onlyFavourites = !this.onlyFavourites;
    this.filterRecipesByName();
  }

  /**
   * Functions that filters the recipes by name
   */
  filterRecipesByName() {
      this.filteredRecipes = this.recipes.filter(
        t =>
          t[0].name
            .toLowerCase()
            .includes(this.recipeNameSearchForm.value.toLowerCase()) === true
            && (t[0].isFavourite || !this.onlyFavourites)
      );

  }
}
