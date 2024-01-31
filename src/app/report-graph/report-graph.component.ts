import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

import { GraphData } from 'src/app/shared/interfaces/graph-data.interface';
import { ReportGraphService } from './services/report-graph.service';

@Component({
  selector: 'app-report-graph',
  templateUrl: './report-graph.component.html',
  styleUrls: ['./report-graph.component.scss'],
})
export class ReportGraphComponent implements OnInit, OnDestroy {
  public graphData!: GraphData;
  public id!: string;
  public chart!: Chart;
  public chartId: string = 'MyChart';
  private routeSubscription!: Subscription;
  private readonly chartColors = ['blue', 'green', 'yellow', 'orange'];
  private readonly chartType = 'bar';

  constructor(
    private route: ActivatedRoute,
    private graphService: ReportGraphService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.graphService.getGraphData(this.id).subscribe((data) => {
        this.graphData = data;
        this.createChart();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private createChart(): void {
    Chart.register(...registerables);

    if (!this.graphData || !this.graphData.data) {
      return;
    }

    const labels = Object.keys(this.graphData.data);
    const values = Object.values(this.graphData.data);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Reports',
          data: values,
          backgroundColor: this.chartColors,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    this.chart = new Chart(this.chartId, {
      type: this.chartType,
      data: data,
      options: options,
    });
  }
}
