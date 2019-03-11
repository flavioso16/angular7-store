import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class DataStorageService {
  private RECIPE_URI = 'https://ng-recipe-book-5653a.firebaseio.com/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    return this.httpClient.put(this.RECIPE_URI, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>(this.RECIPE_URI)
      .pipe(map(
        (recipes) => {
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