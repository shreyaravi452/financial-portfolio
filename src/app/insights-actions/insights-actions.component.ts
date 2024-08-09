import { Component, Input } from '@angular/core';
import { MarketMoversComponent } from '../market-movers/market-movers.component';
import { ActionsComponent } from '../actions/actions.component';
import { Holding, StockBought } from '../interfaces/Stock';

@Component({
  selector: 'app-insights-actions',
  standalone: true,
  imports: [
    MarketMoversComponent,
    ActionsComponent
  ],
  templateUrl: './insights-actions.component.html',
  styleUrl: './insights-actions.component.css'
})
export class InsightsActionsComponent {
  @Input() transactions: any;
  @Input() dashboardData: any;
  @Input() holdings: Holding[] = [];
  @Input() watchlistItems: StockBought[] = [];
}
