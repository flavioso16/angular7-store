import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(switchMap(
        (authState: fromAuth.State) => {
          const newReq = req.clone({
            params: req.params.append('auth', authState.token)
          });
          return next.handle(newReq);
        }
      ));
  }
}