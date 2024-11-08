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

  filtrarC($event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.selectedFuelType = $event.fuelType;
    this.minPrice = $event.minPrice;
    this.maxPrice = $event.maxPrice;
    
    this.filterApplied.emit({
      fuelType: this.selectedFuelType,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }
}
