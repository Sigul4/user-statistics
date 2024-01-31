import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportGraphService } from './services/report-graph.service';
import { GraphData } from '../shared/interfaces/graph-data.interface';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-report-graph',
  templateUrl: './report-graph.component.html',
  styleUrls: ['./report-graph.component.scss']
})
export class ReportGraphComponent {
  public graphData!: GraphData;
  public id!: number;
  public chart: any;

  constructor(private route: ActivatedRoute, private graphService: ReportGraphService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convert id to a number

      this.graphService.getGraphData(this.id).subscribe(data => {
        this.graphData = data;
        console.log('data',data)
        this.createChart();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    Chart.register(...registerables);
  
    const labels = Object.keys(this.graphData.data);
    const values = Object.values(this.graphData.data);
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Reports',
          data: values,
          backgroundColor: ['blue', 'green', 'yellow', 'orange']
        }
      ]
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: data,
      options: options
    });
  }
  
}
