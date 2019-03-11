import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth')
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
        // console.log(response.type === HttpEventType.Sent);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}