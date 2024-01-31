import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

import { ACCESS_TOKEN, ROLE } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import {
  DASHBOARD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  USER_ASSESSMENT_PAGE_ROUTE,
  USER_MANAGEMENT_PAGE_ROUTE,
} from 'src/app/shared/constants/routes.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public DASHBOARD = DASHBOARD_PAGE_ROUTE;
  public LOGIN = LOGIN_PAGE_ROUTE;
  public USER_MANAGEMENT = USER_MANAGEMENT_PAGE_ROUTE;
  public isAdmin!: boolean;
  public isLoginIn!: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.localStorageService.get(ROLE) === 'Admin';
    this.isLoginIn = !!this.localStorageService.get(ACCESS_TOKEN);

    // no takeUntil because it checks every time
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd &&
            event.urlAfterRedirects !== USER_ASSESSMENT_PAGE_ROUTE &&
            event.urlAfterRedirects !== this.USER_MANAGEMENT
        )
      )
      .subscribe(() => {
        this.isAdmin = this.localStorageService.get(ROLE) === 'Admin';
        this.isLoginIn = !!this.localStorageService.get(ACCESS_TOKEN);
      });
  }

  public logOut(): void {
    this.localStorageService.remove(ROLE);
    this.localStorageService.remove(ACCESS_TOKEN);
  }

  public goBack(): void {
    this.location.back();
  }
}
