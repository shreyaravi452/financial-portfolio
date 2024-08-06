import { Component, Input } from '@angular/core';
import { StockBought } from '../interfaces/Stock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './watchlist-item.component.html',
  styleUrl: './watchlist-item.component.css'
})
export class WatchlistItemComponent {
  @Input() watchlistItem!: StockBought;

}
