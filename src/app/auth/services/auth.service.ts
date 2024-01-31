import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ACCESS_TOKEN, ROLE } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { LoginData } from 'src/app/auth/types/login-data.interface';
import { LoginResponse } from 'src/app/auth/types/login-response.interface';
import { LOGIN_PAGE_ROUTE } from 'src/app/shared/constants/routes.constants';
import { HttpConfigService } from 'src/app/shared/services/http-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpConfigService: HttpConfigService,
    private router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}

  public login(loginData: LoginData): Observable<LoginResponse> {
    return this.httpConfigService.postRequest<LoginResponse, LoginData>('login', loginData);
  }

  public redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  public logout(): void {
    this.localStorageService.remove(ACCESS_TOKEN);
    this.localStorageService.remove(ROLE);
    this.router.navigate([LOGIN_PAGE_ROUTE]);
  }
}
