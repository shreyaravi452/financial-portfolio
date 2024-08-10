import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransactionEntry } from '../interfaces/Stock';
import { PortfolioService } from '../portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnChanges {
  @Input() transactions: any;
  transactionsEntries: TransactionEntry[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.renderTransactions();
    }
  }

  renderTransactions(): void {
    console.log("transactions", this.transactions);
    this.transactionsEntries = []; // Clear previous entries
    this.transactions?.forEach((element: number[]) => {
      element[3].toString();
    });
    this.transactions?.forEach((element: string[]) => {
      this.portfolioService.getStockStats(element[1]).subscribe(data => {
        const transEntry: TransactionEntry = {
          symbol: element[1],
          name: data?.shortName || '',
          action: element[2],
          quantity: Number(element[3]),
          bsPrice: Number(element[4]),
          currPrice: data?.currentPrice || 0,
          date: this.formatDate(element[5])
        };
        this.transactionsEntries.push(transEntry);
      });
    });
  }
  formatDate(inputDate: string): string {
    // Parse the input date string
    const date = new Date(inputDate);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format timezone offset
    const timezoneOffset = date.getTimezoneOffset();
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
    const timezone = (timezoneOffset > 0 ? '-' : '+') + offsetHours + ':' + offsetMinutes;

    // Format the final string
    return `${day}-${month}-${year}`;
  }


}
