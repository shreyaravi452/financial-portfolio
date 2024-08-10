import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import csvtojson from 'csvtojson';

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
export class SearchComponent implements OnInit {
  @Output() selectedSymbol = new EventEmitter<string>();

  searchText: string = '';
  searchResults: string[] = [];
  allStockSymbols: string[] = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'BABA', 'INTC', 'CSCO'];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // this.loadStockSymbols();
  }

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
  // async loadStockSymbols(): Promise<void> {
  //   try {
  //     let data: any;
  //     this.http.get('/assets/Symbols.csv', { responseType: "text" }).subscribe(
  //       dat => {
  //         data = dat;
  //       }
  //     )
  //     // const data = await this.http.get('/assets/Symbols.csv', { responseType: 'text' }).toPromise();
  //     console.log("data", data);
  //     const jsonObj = await csvtojson().fromString(data ? data : "");
  //     this.allStockSymbols = jsonObj.map((row: any) => row[0]);
  //     console.log(this.allStockSymbols); // Extract the single column values
  //   } catch (error) {
  //     console.error('Error loading or parsing CSV file:', error);
  //   }
  // }
  loadStockSymbols(): void {
    this.http.get('/assets/Symbols.csv', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          csvtojson()
            .fromString(data)
            .then((jsonObj) => {
              this.allStockSymbols = jsonObj.map((row: any) => row[0]); // Adjust as needed based on CSV structure
            });
        },
        error: (err) => console.error('Error loading CSV file:', err)
      });
  }
}
