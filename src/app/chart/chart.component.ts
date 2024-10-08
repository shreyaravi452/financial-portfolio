import { BaseChartDirective, NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    FormsModule,
    NgChartsModule,
    CommonModule
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  public lineChartData: ChartData<'line', (number | null)[], string> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public networthChartData: ChartData<'line', (number | null)[], string> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  public isBrowser: boolean = true; // Ensure this condition is set correctly
  public symbol: string = 'AAPL'; // Default value
  public startDate: string = '2024-06-22'; // Default value
  public endDate: string = '2024-08-12'; // Default value
  showFirstChart: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.fetchHistoricalData();
    this.fetchNetworthData();
  }
  fetchData(): void {
    this.fetchHistoricalData();
    this.fetchNetworthData();
  }


  fetchHistoricalData(): void {


    this.portfolioService.getHistoricalData(this.symbol, this.startDate, this.endDate).subscribe(
      data => {
        if (!data || data.length === 0) {
          console.log('No historical data found');
          return;
        }

        const labels = data.map((d: { x: string; }) => d.x); // Extract the labels (dates)
        const chartData = data.map((d: { y: number; }) => d.y); // Extract the data points

        // Initialize lineChartData if it's not already initialized

        // Assign labels and data to lineChartData
        this.lineChartData.labels = labels;
        this.lineChartData.datasets[0].data = chartData;
        this.lineChartData.datasets[0].label = `Historical Data of ${this.symbol}`;

        // Manually trigger change detection
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching historical data:', error);
      }
    );
  }
  fetchNetworthData(): void {
    const startDate = '2024-08-07';
    const endDate = '2024-08-09';

    this.portfolioService.getNetworthGraphData(this.startDate, this.endDate).subscribe(
      data => {
        if (!data || data.length === 0) {
          console.log('No networth data found');
          return;
        }

        const labels = data.map((d: { date: string; }) => d.date); // Extract the labels (dates)
        const chartData = data.map((d: { networth: number; }) => d.networth); // Extract the data points

        // Initialize networthChartData if it's not already initialized

        // Assign labels and data to networthChartData
        this.networthChartData.labels = labels;
        this.networthChartData.datasets[0].data = chartData;
        this.networthChartData.datasets[0].label = "Realized Profit";

        // Manually trigger change detection
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching networth data:', error);
      }
    );
  }
}