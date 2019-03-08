import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  private RECIPE_URI = 'https://ng-recipe-book-5653a.firebaseio.com//recipes.json';

  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.RECIPE_URI, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.RECIPE_URI)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );

  }
}