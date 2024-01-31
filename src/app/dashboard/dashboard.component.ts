import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { DashboardService } from './services/dashboard.service';
import { ReportData } from 'src/app/shared//interfaces/report-data.interface';
import { LOADING_REPORTS_ERROR } from 'src/app/shared/constants/error.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public reports: ReportData[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadReports(): void {
    this.dashboardService
      .getReports()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (reports: ReportData[]) => {
          this.reports = reports;
        },
        (error) => {
          console.error(LOADING_REPORTS_ERROR, error);
        }
      );
  }
}
