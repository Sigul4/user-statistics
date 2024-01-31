import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ACCESS_TOKEN } from 'src/app/auth/auth.constants';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { ReportData } from 'src/app/shared/interfaces/report-data.interface';
import { HttpConfigService } from 'src/app/shared/services/http-config.service';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private httpConfigService: HttpConfigService,
    private localStorageService: LocalStorageService
  ) {}

  public getReports(): Observable<ReportData[]> {
    const token: string | null = this.localStorageService.get<string>(ACCESS_TOKEN);

    if (!token) return of([]);

    return this.httpConfigService.getRequest<ReportData[]>('userassessments');
  }
}
