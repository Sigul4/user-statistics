import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { ReportData } from 'src/app/shared/interfaces/report-data.interface';
import { GeneralConfigService } from 'src/app/shared/services/general-config.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private config: GeneralConfigService,
    private localStorageService: LocalStorageService,
  ) { }

  public getReports(): Observable<ReportData[]> {
    const token = this.localStorageService.get(ACCESS_TOKEN);

    const headers = new HttpHeaders().set('X-Token', token);

    return this.http.get<ReportData[]>(this.config.getBaseUrl('userassessments'), { headers });
  }
}
