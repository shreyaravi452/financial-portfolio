import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  isProfit: boolean = true;
  title: String = this.isProfit==true? "Gainers":"Losers";
  
}
