import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  selectedFuelType: string = '';
  minPrice: number = 0;
  maxPrice: number = 200;

  // VARIABLES Y EVENTOS DE FILTRO PRECIO
  @Output() filterApplied = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();

  // VARIABLES Y EVENTOS DE FILTRO CÓDIGO POSTAL
  @Output() codPosElegidoNav = new EventEmitter<string>();
  codPostNav: string | undefined; 

  // MÉTODOS DE FILTRO PRECIO
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

  // MÉTODOS DE FILTRO CÓDIGO POSTAL
  // Método que maneja el evento recibido del hijo.
  recibircodPostAutocomplete(codPostAutocomplete: string) {
    this.codPostNav = codPostAutocomplete;
    this.realizarEnvioAScreen();
  }

  realizarEnvioAScreen() {
    if (this.codPostNav) {
      this.codPosElegidoNav.emit(this.codPostNav);  // Emite el valor de codPostNav
    }
  }
}
