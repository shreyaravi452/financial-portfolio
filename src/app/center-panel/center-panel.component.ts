import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { NetworthService } from '../services/networth.service';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-center-panel',
  standalone: true,
  imports: [
    ChartComponent, 
    NetworthService,
    provideHttpClient,
  ],
  templateUrl: './center-panel.component.html',
  styleUrl: './center-panel.component.css'
})


export class CenterPanelComponent implements OnInit {
  networth: number = 0;

  constructor(private networthService: NetworthService) {}

  ngOnInit(): void {
    this.fetchNetworth();
  }

  fetchNetworth(): void {
    this.networthService.getNetworth().subscribe(
      data => {
        this.networth = data.net_worth; // Ensure this matches your Flask response structure
      },
      error => {
        console.error('Error fetching net worth:', error);
      }
    );
  }
}

