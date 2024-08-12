import { Component, Input, OnInit } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-center-panel',
  standalone: true,
  imports: [
    ChartComponent,

  ],
  templateUrl: './center-panel.component.html',
  styleUrl: './center-panel.component.css',

})


export class CenterPanelComponent implements OnInit {
  networth: number = 0;
  @Input() invested_amount: number = 0;

  constructor(private networthService: PortfolioService) { }

  ngOnInit(): void {
    this.fetchNetworth();
  }

  fetchNetworth(): void {
    this.networthService.getDashboardData().subscribe(
      data => {
        this.networth = data.net_worth; // Ensure this matches your Flask response structure
      },
      error => {
        console.error('Error fetching net worth:', error);
      }
    );
  }
}

