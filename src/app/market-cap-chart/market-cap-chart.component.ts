import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-market-cap-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './market-cap-chart.component.html',
  styleUrls: ['./market-cap-chart.component.css']
})
export class MarketCapChartComponent implements OnInit {
  capStats: any = {};

  Highcharts: typeof Highcharts = Highcharts; // Ensure Highcharts is correctly assigned
  chartOptions: Highcharts.Options = {}; // Initialize chart options

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getCapStats();
  }
  getCapStats(): void {
    this.portfolioService.getCapStats().subscribe(
      data => {
        this.capStats = data;
        console.log("cap stats", this.capStats);
        this.initChart();
      },
      error => {
        console.error('Error fetching cap stats:', error);
      }
    );
  }

  initChart(): void {
    const data = Object.keys(this.capStats).map(key => ({
      name: key,
      y: this.capStats[key]
    }));
    console.log('data', data);

    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Market Cap Distribution'
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
    }
  }
  getMonochromeColors(): string[] {
    const colors = ['#c9989c', '#d5b4b6', '#dcc1c3', '#dcd1d1', '#cbc8ce', '#b2c1cd', '#9f9ebd', '#9592aa'];
    return colors;
  }
}
