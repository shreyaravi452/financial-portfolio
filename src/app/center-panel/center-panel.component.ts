import { Component } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-center-panel',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './center-panel.component.html',
  styleUrl: './center-panel.component.css'
})
export class CenterPanelComponent {

}
