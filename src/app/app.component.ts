import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyWatchlistComponent } from './my-watchlist/my-watchlist.component';
import { WatchlistItemComponent } from './watchlist-item/watchlist-item.component';
import { InsightsActionsComponent } from './insights-actions/insights-actions.component';
import { MarketMoversComponent } from './market-movers/market-movers.component';
import { GainersLosersComponent } from './gainers-losers/gainers-losers.component';
import { ActionsComponent } from './actions/actions.component';
import { CommonModule } from '@angular/common';
import { CenterPanelComponent } from './center-panel/center-panel.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Holding, StockBought } from './interfaces/Stock';
import { PortfolioService } from './portfolio.service';
import { SectorChartComponent } from './sector-chart/sector-chart.component';
import { MarketCapChartComponent } from './market-cap-chart/market-cap-chart.component';
// import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MyWatchlistComponent,
    WatchlistItemComponent,
    InsightsActionsComponent,
    MarketMoversComponent,
    GainersLosersComponent,
    ActionsComponent,
    CommonModule,
    ChartComponent,
    CenterPanelComponent,
    FormsModule,
    SectorChartComponent,
    MarketCapChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnChanges {
  title = 'financial-portfolio-angular';

  watchlistItems: StockBought[] = [];
  holdings: Holding[] = [];
  dashboardData: any;
  transactions: any;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getWatchlistItems();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['watchlistItems']) {
      this.watchlistItems = [];
      this.getWatchlistItems();
    }
  }
  loadDashboardData(): void {
    this.portfolioService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
        this.holdings = this.dashboardData.holdings;
        this.transactions = this.dashboardData.transactions;
        this.holdings.forEach((element) => {
          this.getStockInfo(element.symbol, element.weighted_average_price);
        });
      },
      error => {
        // console.error('Error fetching dashboard data', error);
      }
    );
  }
  getStockStats(symbol: string, wap: string): void {
    this.portfolioService.getStockStats(symbol).subscribe(
      data => {
        // this.stockData = data;
        let stockData: any = data;
        let holding: StockBought = {
          currentPrice: 0,
          symbol: "",
          name: "",
          refPrice: 0,
          isProfit: false,
          profitLossPercent: 0,
          profitLossDollar: 0,
          sector: ""
        }
        holding.currentPrice = stockData?.currentPrice;
        holding.symbol = symbol;
        holding.name = stockData?.shortName;
        holding.refPrice = Number(wap);
        holding.isProfit = holding.currentPrice > holding.refPrice ? true : false;
        holding.profitLossPercent = (Math.abs(holding.currentPrice - holding.refPrice) / holding.refPrice) * 100;
        holding.profitLossDollar = Math.abs(holding.currentPrice - holding.refPrice);
        holding.sector = stockData?.sector;
        this.watchlistItems.push(holding);
      },
      error => {
        // console.error('Error fetching stock stats', error);
      }
    );
  }
  getStockInfo(symbol: string, wap: string) {
    this.getStockStats(symbol, wap);
  }
  getWatchlistItems() {
    this.watchlistItems = [];
    this.loadDashboardData();

  }
  sendData() {
    this.portfolioService.changeData(this.watchlistItems);
  }

}
