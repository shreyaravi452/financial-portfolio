import { Component } from '@angular/core';
import { GainersLosersComponent } from '../gainers-losers/gainers-losers.component';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-market-movers',
  standalone: true,
  imports: [
    GainersLosersComponent,
    OverviewComponent
  ],
  templateUrl: './market-movers.component.html',
  styleUrl: './market-movers.component.css'
})
export class MarketMoversComponent {
  activePLType: String = "percent";
  
  selectPLType(buttonId: string){
    this.activePLType = buttonId;
  }
  isActive(buttonId: string): boolean {
    return this.activePLType === buttonId;
  }
}
