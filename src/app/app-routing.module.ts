import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] },
  { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
  imports: [
    // when we using canLoad this type of preloadingStrategy maybe not working, it was this case. 
    // If we need make login to load the module this preload not have the same behavior
    // RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}