import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private baseUrl: string,
    private localStorageService: LocalStorageService,
  ) {}

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  public getRequest<T>(endpoint: string): Observable<T> {
    const token = this.localStorageService.get<string>(ACCESS_TOKEN);

    if (!token) return of();

    const headers = new HttpHeaders().set('X-Token', token);

    const url = this.getUrl(endpoint);
    return this.http.get<T>(url, { headers });
  }

  public postRequest<T, B>(endpoint: string, body: B): Observable<T> {
    const url = this.getUrl(endpoint);

    return this.http.post<T>(url, body);
  }
}
