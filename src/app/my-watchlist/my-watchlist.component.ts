import { Component } from '@angular/core';
import { WatchlistItemComponent } from '../watchlist-item/watchlist-item.component';
import { StockBought } from '../interfaces/Stock';
import { CommonModule } from '@angular/common';

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
}
