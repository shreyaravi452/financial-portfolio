import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SearchComponent
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  activePopup: string | null = null;
  qty: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  selectedSymbol: string = "";
  currentBuyPrice: number = 0;
  selectedBuyQuantity: number = 0;

  constructor(private portfolioService: PortfolioService) { }

  handleSelectedSymbol(symbol: string) {
    this.selectedSymbol = symbol;
    console.log('Selected Symbol', this.selectedSymbol);
  }
  openBuy(popupId: string) {
    this.activePopup = popupId;
  }
  closeBuy() {
    this.activePopup = null;
  }
  onBuy(popupId: string) {
    console.log("submitting buy");
    if (this.selectedSymbol != "") {
      console.log("selected symbol in if stmt");
      this.portfolioService.postAction("buy", this.selectedSymbol, this.selectedBuyQuantity, this.currentBuyPrice)
        .subscribe(
          response => {
            console.log("Response from backend:", response);
          },
          error => {
            console.error("Error occurred:", error);
          }
        );
    }
    this.closeBuy();
  }

  openSell(popupId: string) {
    this.activePopup = popupId;
  }
  closeSell() {
    this.activePopup = null;
  }
  onSell(popupId: string) {
    this.closeSell();
  }
  openTransactions(popupId: string) {
    this.activePopup = popupId;
  }
  closeTransactions() {
    this.activePopup = null;
  }
}
