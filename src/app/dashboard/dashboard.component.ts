import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from './services/dashboard.service';
import { ReportData } from '../shared/interfaces/report-data.interface';

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
          console.error('Error loading reports:', error);
        }
      );
  }
}
