import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  activePopup: string | null = null;
  qty: number[] = Array.from({length: 20}, (_, i) => i+1);

  openBuy(popupId: string) {
    this.activePopup = popupId;
  }
  closeBuy() {
    this.activePopup = null;
  }
  onBuy(popupId: string) {
    this.closeBuy();
  }
  openSell(popupId: string) {
    this.activePopup = popupId;
  }
  closeSell() {
    this.activePopup = null;
  }
  onSell(popupId: string) {
    this.closeSell();
  }
}
