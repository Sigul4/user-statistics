import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { UserDto } from 'src/app/shared/interfaces/user-dto.interface';
import { HttpConfigService } from 'src/app/shared/services/http-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(
    private httpConfigService: HttpConfigService,
    private localStorageService: LocalStorageService,
  ) { }
  
  public getUsers(): Observable<UserDto[]> {
    const token = this.localStorageService.get<string>(ACCESS_TOKEN);

    if (!token) return of([]);

    // Вместо создания новых HttpHeaders мы просто используем httpConfigService для отправки запроса.
    return this.httpConfigService.getRequest<UserDto[]>('users');
  }

  public deleteUser(userToDelete: UserDto): Observable<void> {
    // return this.httpConfigService.deleteRequest<void>(`user/${userToDelete.id}`);
    // managing users
    return of();
  }
}
