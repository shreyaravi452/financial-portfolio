import { BaseChartDirective, NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
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
  public isBrowser: boolean;


  fetchHistoricalData(): void {
    const symbol = 'AAPL'; // Replace with the desired stock symbol
    const startDate = '2022-01-01';
    const endDate = '2022-12-31';
 
    this.portfolioService.getHistoricalData(symbol, startDate, endDate).subscribe(
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
 
    this.portfolioService.getNetworthGraphData('AAPL', startDate, endDate).subscribe(
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

        // Manually trigger change detection
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching networth data:', error);
      }
    );
  }
}