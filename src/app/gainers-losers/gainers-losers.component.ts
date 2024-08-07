import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StockBought } from '../interfaces/Stock';

@Component({
  selector: 'app-gainers-losers',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './gainers-losers.component.html',
  styleUrl: './gainers-losers.component.css'
})
export class GainersLosersComponent {
  @Input() items!: StockBought[];
  @Input() isProfit!: boolean;
  @Input() displayType: string = "percent";
  title: string = "";
  
  ngOnInit(){
    this.title = this.isProfit? "Gainers" : "Losers";
  }
}
