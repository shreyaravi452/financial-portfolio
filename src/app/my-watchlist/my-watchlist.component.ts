import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WatchlistItemComponent } from '../watchlist-item/watchlist-item.component';
import { Holding, StockBought } from '../interfaces/Stock';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-my-watchlist',
  standalone: true,
  imports: [
    WatchlistItemComponent,
    CommonModule
  ],
  templateUrl: './my-watchlist.component.html',
  styleUrl: './my-watchlist.component.css'
})
export class MyWatchlistComponent {
  // stockData: any;
  @Input() transactions: any;
  @Input() dashboardData: any;
  @Input() holdings: Holding[] = [];
  // holding: StockBought = {
  //   currentPrice: 0,
  //   symbol: "",
  //   name: "",
  //   refPrice: 0,
  //   isProfit: false,
  //   profitLossPercent: 0,
  //   profitLossDollar: 0,
  //   sector: ""
  // };

  constructor() { }


  @Input() watchlistItems: StockBought[] = [];


  ngOnInit(): void {
    // this.loadDashboardData();
    // this.getWatchlistItems();
    // this.getStockStats("CSCO");
  }
  ngOnChanges(): void {
    // this.getWatchlistItems();
  }
  // loadDashboardData(): void {
  //   this.portfolioService.getDashboardData().subscribe(
  //     data => {
  //       this.dashboardData = data;
  //       this.holdings = this.dashboardData.holdings;
  //       this.transactions = this.dashboardData.transactions;
  //       this.holdings.forEach((element) => {
  //         this.getStockInfo(element.symbol, element.weighted_average_price);
  //         this.stockData = {};
  //         this.holding = {
  //           currentPrice: 0,
  //           symbol: "",
  //           name: "",
  //           refPrice: 0,
  //           isProfit: false,
  //           profitLossPercent: 0,
  //           profitLossDollar: 0,
  //           sector: ""
  //         }
  //       });
  //     },
  //     error => {
  //       // console.error('Error fetching dashboard data', error);
  //     }
  //   );
  // }
  // getStockStats(symbol: string, wap: string): void {
  //   this.portfolioService.getStockStats(symbol).subscribe(
  //     data => {
  //       this.stockData = data;
  //       this.holding.currentPrice = this.stockData?.currentPrice;
  //       this.holding.symbol = symbol;
  //       this.holding.name = this.stockData?.shortName;
  //       this.holding.refPrice = Number(wap);
  //       this.holding.isProfit = this.holding.currentPrice > this.holding.refPrice ? true : false;
  //       this.holding.profitLossPercent = (Math.abs(this.holding.currentPrice - this.holding.refPrice) / this.holding.refPrice) * 100;
  //       this.holding.profitLossDollar = Math.abs(this.holding.currentPrice - this.holding.refPrice);
  //       this.holding.sector = this.stockData?.sector;
  //       this.watchlistItems.push(this.holding);
  //     },
  //     error => {
  //       // console.error('Error fetching stock stats', error);
  //     }
  //   );
  // }
  // getStockInfo(symbol: string, wap: string) {
  //   this.getStockStats(symbol, wap);
  // }
  // getWatchlistItems() {
  //   this.loadDashboardData();

  // }
  // sendData() {
  //   this.portfolioService.changeData(this.watchlistItems);
  // }
}
