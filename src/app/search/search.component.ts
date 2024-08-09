import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() selectedSymbol = new EventEmitter<string>();

  searchText: string = '';
  searchResults: string[] = [];
  allStockSymbols: string[] = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'BABA', 'INTC', 'CSCO'];

  onSearchChange(): void {
    if (this.searchText) {
      this.searchResults = this.allStockSymbols.filter(item =>
        item.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  onResultClick(result: string): void {
    this.searchText = result;
    this.searchResults = [];
    // You can also emit an event if needed
    this.selectedSymbol.emit(result);
  }
}
