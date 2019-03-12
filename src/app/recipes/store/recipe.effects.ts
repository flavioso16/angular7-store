import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
  RECIPE_URI = 'https://ng-recipe-book-5653a.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPES)
    )
    .pipe(
      switchMap((action: RecipeActions.FetchRecipes) => this.httpClient.get<Recipe[]>(this.RECIPE_URI))
    )
    .pipe(
      map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      )
    );

  @Effect({ dispatch: false })
  storeRecipe = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPES)
    )
    .pipe(
      withLatestFrom(this.store.select('recipes'))
    )
    .pipe(
      switchMap(
        ([action, state]) => this.httpClient.put(this.RECIPE_URI, state.recipes)
      )
    );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) { }
}