import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Output() filterApplied = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();
  @Output() codPosElegidoNav = new EventEmitter<string>();
  @Output() ccaaSelected = new EventEmitter<string>();

  selectedFuelType: string = '';
  minPrice: number = 0;
  maxPrice: number = 200;
  codPostNav: string | undefined;

  filtrarC($event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.selectedFuelType = $event.fuelType;
    this.minPrice = $event.minPrice;
    this.maxPrice = $event.maxPrice;
    this.filterApplied.emit({ fuelType: this.selectedFuelType, minPrice: this.minPrice, maxPrice: this.maxPrice });
  }

  recibircodPostAutocomplete(codPostAutocomplete: string) {
    this.codPostNav = codPostAutocomplete;
    this.realizarEnvioAScreen();
  }

  realizarEnvioAScreen() {
    if (this.codPostNav) {
      this.codPosElegidoNav.emit(this.codPostNav);
    }
  }

  // Método para emitir la comunidad autónoma seleccionada
  onCCAASelected(ccaaId: string) {
    this.ccaaSelected.emit(ccaaId);
  }
}
