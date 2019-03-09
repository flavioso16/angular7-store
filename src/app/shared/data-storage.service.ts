import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private RECIPE_URI = 'https://ng-recipe-book-5653a.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put(this.RECIPE_URI, this.recipeService.getRecipes(), {
      observe: 'body', // observe: 'events'
      params: new HttpParams().set('auth', token)
      // headers: new HttpHeaders().set('Authorization', 'Bearer asijafijsdfsdfij').append('value2', 'fksdokfsokg')
    });

    // Another way to sent request
    // const req = new HttpRequest(
    //   'PUT',
    //   this.RECIPE_URI,
    //   this.recipeService.getRecipes(),
    //   {
    //     reportProgress: true,
    //     params: new HttpParams().set('auth', token)
    //   }
    // );
    // return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>(this.RECIPE_URI, {
      params: new HttpParams().set('auth', token)
    })
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