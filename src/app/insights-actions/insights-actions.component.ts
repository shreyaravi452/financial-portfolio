import { Component } from '@angular/core';
import { MarketMoversComponent } from '../market-movers/market-movers.component';
import { ActionsComponent } from '../actions/actions.component';

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

}
