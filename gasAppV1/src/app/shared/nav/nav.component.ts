import { Component, EventEmitter, Output } from '@angular/core';
import { GasolineraListComponent } from '../../components/gasolinera-list/gasolinera-list.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  //@Output() filterApplied = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();
  @Output() tresValoresElegidosNav = new EventEmitter<{ fuelTypeNav: string, minPriceNav: number, maxPriceNav: number }>();
  @Output() codPosElegidoNav = new EventEmitter<string>();
  @Output() ccaaSelected = new EventEmitter<string>();

  fuelTypeNav: string = '';
  minPriceNav: number = 0;
  maxPriceNav: number = 3;

  codPostNav: string | undefined;

  /*filtrarC($event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.selectedFuelType = $event.fuelType;
    this.minPrice = $event.minPrice;
    this.maxPrice = $event.maxPrice;
    this.filterApplied.emit({ fuelType: this.selectedFuelType, minPrice: this.minPrice, maxPrice: this.maxPrice });
  }*/

  recibirTresValoresSelectRange(event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.fuelTypeNav = event.fuelType;
    this.minPriceNav = event.minPrice;
    this.maxPriceNav = event.maxPrice;
    this.realizarEnvioTresAScreen();
  }

  realizarEnvioTresAScreen() {
    if(this.fuelTypeNav && this.minPriceNav && this.maxPriceNav) {
      this.tresValoresElegidosNav.emit({ fuelTypeNav: this.fuelTypeNav, minPriceNav: this.minPriceNav, maxPriceNav: this.maxPriceNav });
    }
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
