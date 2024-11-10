// filtrar-carburante.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-filtrar-carburante',
  templateUrl: './filtrar-carburante.component.html',
  styleUrls: ['./filtrar-carburante.component.css']
})
export class FiltrarCarburanteComponent {
  fuelType: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;

  @Output() filterApplied = new EventEmitter<{ fuelType: string, minPrice: number, maxPrice: number }>();

  constructor(private gasolineraService: GasolineraService) {}

  seleccionarFuelType(fuelType: string) {
    this.fuelType = fuelType;
    if (fuelType) {
      this.gasolineraService.obtenerRangoPrecios(fuelType).subscribe(rango => {
        this.minPrice = rango.minPrice;
        this.maxPrice = rango.maxPrice;
        this.selectedMinPrice = this.minPrice;
        this.selectedMaxPrice = this.maxPrice;
      });
    } else {
      this.resetFiltro();
    }
  }

  aplicarFiltro() {
    this.filterApplied.emit({
      fuelType: this.fuelType,
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice
    });
  }  

  resetFiltro() {
    this.fuelType = '';
    this.minPrice = 0;
    this.maxPrice = 0;
    this.selectedMinPrice = 0;
    this.selectedMaxPrice = 0;
    this.filterApplied.emit({ fuelType: '', minPrice: 0, maxPrice: 0 });
  }
}