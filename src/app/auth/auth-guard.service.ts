import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(map(
        (authState: fromAuth.State) => authState.authenticated
      ));
  }

}