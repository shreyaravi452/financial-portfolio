import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { PortfolioService } from '../portfolio.service';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SearchComponent,
    TransactionsComponent
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  transactions: any;
  activePopup: string | null = null;
  qty: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  selectedSymbol: string = "";
  currentBuyPrice: number = 0;
  selectedBuyQuantity: number = 0;
  currentSellPrice: number = 0;
  selectedSellQuantity: number = 0;

  constructor(private portfolioService: PortfolioService) { }


  ngOnInit(): void {
    this.getTransactions();
  }
  ngOnChanges() {
    this.getTransactions();
  }
  handleSelectedSymbol(symbol: string) {
    this.selectedSymbol = symbol;
    console.log('Selected Symbol', this.selectedSymbol);
  }
  openBuy(popupId: string) {
    this.activePopup = popupId;
    console.log("buy opened");
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
            this.getTransactions();
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
    console.log("submitting sell");
    if (this.selectedSymbol != "") {
      console.log("selected symbol in if stmt");
      this.portfolioService.postAction("sell", this.selectedSymbol, this.selectedSellQuantity, this.currentSellPrice)
        .subscribe(
          response => {
            console.log("Response from backend:", response);
            this.getTransactions();
          },
          error => {
            console.error("Cannot sell stock", error);
          }
        );
    }
    this.closeSell();
  }
  openTransactions(popupId: string) {
    this.activePopup = popupId;
  }
  closeTransactions() {
    this.activePopup = null;
  }
  getTransactions() {
    this.portfolioService.getDashboardData().subscribe(
      data => {
        console.log(data);
        this.transactions = data.transactions;
      }
    );
  }
}
