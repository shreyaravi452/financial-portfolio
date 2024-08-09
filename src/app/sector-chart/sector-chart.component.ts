import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-sector-chart',
  standalone: true,
  schemas: [],
  imports: [HighchartsChartModule],
  templateUrl: './sector-chart.component.html',
  styleUrls: ['./sector-chart.component.css']
})
export class SectorChartComponent implements OnInit {
  sectorStats: any = {}; // Initialize as empty object
  Highcharts: typeof Highcharts = Highcharts; // Ensure Highcharts is correctly assigned
  chartOptions: Highcharts.Options = {}; // Initialize chart options

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getSectorStats();
  }

  getSectorStats(): void {
    this.portfolioService.getSectorStats().subscribe(
      data => {
        this.sectorStats = data;
        console.log("sector stats", this.sectorStats); // Verify data
        this.initChart(); // Initialize chart after data is received
      },
      error => {
        console.error('Error fetching sector stats:', error);
      }
    );
  }

  initChart(): void {
    const data = Object.keys(this.sectorStats).map(key => ({
      name: key,
      y: this.sectorStats[key]
    }));
    console.log('data', data);

    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Sector Distribution'
      },
      plotOptions: {
        pie: {
          colors: this.getMonochromeColors(), // Use monochrome color scheme
          innerSize: '50%', // Optional: for donut chart appearance
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Stocks',
        type: 'pie',
        data: data
      }]
    };
  }

  getMonochromeColors(): string[] {
    const colors = ['#c9989c', '#d5b4b6', '#dcc1c3', '#dcd1d1', '#cbc8ce', '#b2c1cd', '#9f9ebd', '#9592aa'];
    return colors;
  }
}
