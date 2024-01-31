import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { DASHBOARD_PAGE_ROUTE } from 'src/app/shared/constants/routes.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public canLoad(): boolean {
    const role = this.localStorageService.get<string>('role');

    if (role === 'Admin') {
      return true;
    } else {
      this.router.navigate([DASHBOARD_PAGE_ROUTE]);
      return false;
    }
  }
}
