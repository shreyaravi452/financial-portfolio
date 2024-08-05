import { Component } from '@angular/core';
import { WatchlistItemComponent } from '../watchlist-item/watchlist-item.component';

@Component({
  selector: 'app-my-watchlist',
  standalone: true,
  imports: [WatchlistItemComponent],
  templateUrl: './my-watchlist.component.html',
  styleUrl: './my-watchlist.component.css'
})
export class MyWatchlistComponent {

}
