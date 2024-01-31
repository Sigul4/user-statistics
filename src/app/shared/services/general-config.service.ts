import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralConfigService {
  constructor(@Inject('API_URL') private baseUrl: string) {}

  public getBaseUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}
