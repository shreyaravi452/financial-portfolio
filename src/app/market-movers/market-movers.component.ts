import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { GainersLosersComponent } from '../gainers-losers/gainers-losers.component';
import { OverviewComponent } from '../overview/overview.component';
import { StockBought } from '../interfaces/Stock';
import { CommonModule } from '@angular/common';

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
export class MarketMoversComponent {
  activePLType: string = "percent";
  gain: boolean = true;
  loss: boolean = false;
  watchlistItems: StockBought[] = [
    {
      currentPrice: 5269.75,
      symbol: "CME",
      name: "S&P Futures",
      refPrice: 5200,
      isProfit: true,
      profitLossPercent: 1.03,
      profitLossDollar: 53.75,
      sector: "ABC"
    },
    {
      currentPrice: 209.27,
      symbol: "AAPL",
      name: "Apple Inc.",
      refPrice: 219.90,
      isProfit: false,
      profitLossPercent: 4.82,
      profitLossDollar: 10.59,
      sector: "Information Technology"
    },
    {
      currentPrice: 5269.75,
      symbol: "CME",
      name: "S&P Futures",
      refPrice: 5200,
      isProfit: true,
      profitLossPercent: 1.03,
      profitLossDollar: 53.75,
      sector: "ABC"
    },
    {
      currentPrice: 209.27,
      symbol: "AAPL",
      name: "Apple Inc.",
      refPrice: 219.90,
      isProfit: false,
      profitLossPercent: 4.82,
      profitLossDollar: 10.59,
      sector: "Information Technology"
    }
  ]
  gainers: StockBought[] = [];
  losers: StockBought[] = [];
  
  ngOnInit(): void{
    this.getGainers();
    this.getLosers();
  }
  getGainers(){
    this.watchlistItems.forEach((item => {
      if(item.isProfit == true)
      this.gainers.push(item);
    }));
  }
  getLosers(){
    this.watchlistItems.forEach((item => {
      if(item.isProfit == false)
      this.losers.push(item);
    }));
  }
  selectPLType(buttonId: string){
    this.activePLType = buttonId;
  }
  isActive(buttonId: string): boolean {
    return this.activePLType === buttonId;
  }
}
