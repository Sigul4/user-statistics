import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ACCESS_TOKEN, USER } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { LoginData } from 'src/app/auth/types/login-data.interface';
import { LoginResponse } from 'src/app/auth/types/login-response.interface';
import { LOGIN_PAGE_ROUTE } from 'src/app/shared/constants/routes.constants';
import { GeneralConfigService } from "src/app/shared/services/general-config.service";
import { Observable } from "rxjs";

/**
 * Authentication service
 */
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /**
     * Auth service constructor
     */
    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly localStorageService: LocalStorageService,
        private config: GeneralConfigService,
    ) {}

    /**
     * Login user method
     * @param {LoginData} loginData Login data
     * @returns {LoginResponse} LoginResponse Response from the server
     */
    public login(loginData: LoginData): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.config.getBaseUrl('login'), loginData);
    }

    /**
     * Redirect method
     * @param {string} route Route where to redirect
     * @returns {void}
     */

    public redirectTo(route: string): void {
        this.router.navigate([route]);
    }

    /**
     * Logout method
     * It removes the access token and user from local storage and redirects to login page
     */
    public logout(): void {
        this.localStorageService.remove(ACCESS_TOKEN);
        this.localStorageService.remove(USER);
        this.router.navigate([LOGIN_PAGE_ROUTE]);
    }
}
