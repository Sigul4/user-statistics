import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canLoad(): boolean | UrlTree {
    const token = this.localStorageService.get(ACCESS_TOKEN);
    return token ? true : this.router.createUrlTree(['/auth']);
  }
}
