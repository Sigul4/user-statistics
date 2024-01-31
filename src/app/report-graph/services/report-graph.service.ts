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
export class ReportGraphService {
  constructor(
    private http: HttpClient,
    private config: GeneralConfigService,
    private localStorageService: LocalStorageService,
  ) { }

  public getGraphData(id: number): Observable<GraphData> {
    const token = this.localStorageService.get(ACCESS_TOKEN);

    const headers = new HttpHeaders().set('X-Token', token);

    return this.http.get<GraphData>(this.config.getBaseUrl(`userassessments/graph?id=${id}`), { headers });
  }
}
