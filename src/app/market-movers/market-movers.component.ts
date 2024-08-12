import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GainersLosersComponent } from '../gainers-losers/gainers-losers.component';
import { OverviewComponent } from '../overview/overview.component';
import { Holding, StockBought } from '../interfaces/Stock';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-market-movers',
  standalone: true,
  imports: [
    GainersLosersComponent,
    OverviewComponent,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './market-movers.component.html',
  styleUrl: './market-movers.component.css'
})
export class MarketMoversComponent implements OnInit, OnChanges {
  activePLType: string = "percent";
  gain: boolean = true;
  loss: boolean = false;
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
  @Input() watchlistItems: StockBought[] = []
  overviewItems: StockBought[] = [];
  gainers: StockBought[] = [];
  losers: StockBought[] = [];
  receivedData: any;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    // this.portfolioService.currentData.subscribe(data => {
    //   this.watchlistItems = data;
    // });
    // this.getWatchlistItems();
    this.getGainers();
    this.getLosers();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['watchlistItems']) {
      this.overviewItems = this.getRandomItems(this.watchlistItems, 8);

      this.getGainers();
      this.getLosers();
    }
  }
  getGainers() {
    this.gainers = [];
    this.watchlistItems.forEach((item => {
      if (item.isProfit == true)
        this.gainers.push(item);
    }));
  }
  getLosers() {
    this.losers = [];
    this.watchlistItems.forEach((item => {
      if (item.isProfit == false)
        this.losers.push(item);
    }));
  }
  selectPLType(buttonId: string) {
    this.activePLType = buttonId;
  }
  isActive(buttonId: string): boolean {
    return this.activePLType === buttonId;
  }
  getRandomItems(items: any[], maxItems: number): StockBought[] {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, maxItems);
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
  //       this.getGainers();
  //       this.getLosers();
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
