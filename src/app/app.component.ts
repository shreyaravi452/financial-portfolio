import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyWatchlistComponent } from './my-watchlist/my-watchlist.component';
import { WatchlistItemComponent } from './watchlist-item/watchlist-item.component';
import { InsightsActionsComponent } from './insights-actions/insights-actions.component';
import { MarketMoversComponent } from './market-movers/market-movers.component';
import { GainersLosersComponent } from './gainers-losers/gainers-losers.component';
import { ActionsComponent } from './actions/actions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MyWatchlistComponent,
    WatchlistItemComponent,
    InsightsActionsComponent,
    MarketMoversComponent,
    GainersLosersComponent,
    ActionsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financial-portfolio-angular';
}
