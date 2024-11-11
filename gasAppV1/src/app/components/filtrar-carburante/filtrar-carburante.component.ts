// filtrar-carburante.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-filtrar-carburante',
  templateUrl: './filtrar-carburante.component.html',
  styleUrls: ['./filtrar-carburante.component.css']
})
export class FiltrarCarburanteComponent implements OnInit {
  fuelType: string = '';
  //minPrice: number | undefined;
  //maxPrice: number | undefined;
  minPrice: number = 0;
  maxPrice: number = 3;
  fuelList = ['Biodiesel', 'Bioetanol', 'Gasóleo', 'Gasolina'];

  //@Output() filterApplied = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();
  @Output() tresValoresElegidos = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();


  constructor(private gasolineraService: GasolineraService) {}

  ngOnInit(): void {
    this.resetFiltro()
  }

  formatLabel(value: number): string {
    return `${value}€`;
  }

  realizarEnvioANavDesdeInputYRange(fuelSelect: string, minPriceSelect: number, maxPriceSelect: number) {
    this.fuelType = fuelSelect;
    this.minPrice = minPriceSelect;
    this.maxPrice = maxPriceSelect;
    if(this.fuelType && this.minPrice && this.maxPrice) {
      this.tresValoresElegidos.emit({ fuelType: this.fuelType, minPrice: this.minPrice, maxPrice: this.maxPrice });
    }
  }


  /*seleccionarFuelType(fuelSelect: string, minPrice: number, maxPrice: number) {
    this.fuelType = fuelSelect;
    if (this.fuelType) {
      this.selectedMinPrice = minPrice;
      this.selectedMaxPrice = maxPrice;

      /*this.gasolineraService.obtenerRangoPrecios(fuelType).subscribe(rango => {
        this.minPrice = rango.minPrice;
        this.maxPrice = rango.maxPrice;
        this.selectedMinPrice = this.minPrice;
        this.selectedMaxPrice = this.maxPrice;
      });
    } else {
      this.resetFiltro();
    }
  }*/

  /*aplicarFiltro() {
    this.filterApplied.emit({
      fuelType: this.fuelType,
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice
    });
  }  */

  resetFiltro() {
    this.fuelType = '';
    this.minPrice = 0;
    this.maxPrice = 0;
    this.tresValoresElegidos.emit({ fuelType: this.fuelType, minPrice: this.minPrice, maxPrice: this.maxPrice });
  }
}
