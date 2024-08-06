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
    console.log(popupId);
  }
  closeBuy() {
    this.activePopup = null;
  }
  onBuy(popupId: string) {
    console.log(`Form from ${popupId} submitted`);
    this.closeBuy();
  }
  openSell(popupId: string) {
    this.activePopup = popupId;
    console.log(popupId);
  }
  closeSell() {
    this.activePopup = null;
  }
  onSell(popupId: string) {
    console.log(`Form from ${popupId} submitted`);
    this.closeSell();
  }
}
