import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { GraphData } from 'src/app/shared/interfaces/graph-data.interface';
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
  
  public getUsers(): Observable<any[]> {
    const token = this.localStorageService.get(ACCESS_TOKEN);

    const headers = new HttpHeaders().set('X-Token', token);

    return this.http.get<any[]>(this.config.getBaseUrl(`users`), { headers });
  }

  public deleteUser(id: string): Observable<any> {
    const token = this.localStorageService.get(ACCESS_TOKEN);

    const headers = new HttpHeaders().set('X-Token', token);

    return this.http.delete(this.config.getBaseUrl(`user/${id}`), { headers });
  }
}
