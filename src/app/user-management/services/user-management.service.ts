import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { UserDto } from 'src/app/shared/interfaces/user-dto.interface';
import { GeneralConfigService } from 'src/app/shared/services/general-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(
    private http: HttpClient,
    private config: GeneralConfigService,
    private localStorageService: LocalStorageService,
  ) { }
  
  public getUsers(): Observable<UserDto[]> {
    const token = this.localStorageService.get<string>(ACCESS_TOKEN);

    if (!token) return of();

    const headers = new HttpHeaders().set('X-Token', token);

    return this.http.get<UserDto[]>(this.config.getBaseUrl(`users`), { headers });
  }

  public deleteUser(id: string): Observable<void> {
    const token = this.localStorageService.get<string>(ACCESS_TOKEN);

    if (!token) return of();

    const headers = new HttpHeaders().set('X-Token', token);

    return this.http.delete<void>(this.config.getBaseUrl(`user/${id}`), { headers });
  }
}
