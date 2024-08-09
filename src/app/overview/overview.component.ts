import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { StockBought } from '../interfaces/Stock';
import { PortfolioService } from '../portfolio.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  stockData: any;
  dashboardData: any;

  constructor(private portfolioService: PortfolioService) { }

  @Input() item!: StockBought;
  @Input() displayType: string = "percent";

  ngOnInit(): void {
    // this.getStockStats('AAPL');
    // this.loadDashboardData();
    this.loadDashboardData
    // this.buyStock();
    // this.sellStock();
    // this.resetPortfolio();
  }


  getStockStats(symbol: string): void {
    this.portfolioService.getStockStats(symbol).subscribe(
      data => {
        this.stockData = data;
      },
      error => {
        console.error('Error fetching stock stats', error);
      }
    );
  }
  loadDashboardData(): void {
    this.portfolioService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
      },
      error => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
