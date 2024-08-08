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
          currPrice: data?.currentPrice || 0
        };
        this.transactionsEntries.push(transEntry);
      });
    });
  }
}
