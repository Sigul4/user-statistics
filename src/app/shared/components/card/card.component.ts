import { Component, Input } from '@angular/core';
import { ReportData } from '../../interfaces/report-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'report-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() data!: ReportData;

  constructor(private router: Router) {}

  public navigateToDetails(id: number): void {
    this.router.navigate(['/userassessment/graph', id]);
  }
}
