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
  title: string = "";
  
  ngOnInit(){
    console.log("hi from gainers/losers");
    this.title = this.isProfit? "Gainers" : "Losers";
  }
}
