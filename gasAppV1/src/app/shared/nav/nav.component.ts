import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  selectedFuelType: string = '';
  minPrice: number = 0;
  maxPrice: number = 200;

  @Output() filterApplied = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();

  onPriceChange() {
    // Asegurar que minPrice no exceda maxPrice y viceversa
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    } else if (this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }
  }

  applyFilter() {
    this.filterApplied.emit({
      fuelType: this.selectedFuelType,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }
}
