import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GasolineraListService } from '../../services/gasolinera-list.service';
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrls: ['./gasolinera-list.component.css']
})
export class GasolineraListComponent implements OnInit {

  gasolineraList: Gasolinera[] = [];
  filteredGasolineraList: Gasolinera[] = [];

  @Input() filter = { fuelType: '', minPrice: 0, maxPrice: 0 };

  constructor(private gasolineraService: GasolineraListService) {}

  ngOnInit(): void {
    this.gasolineraService.getGasolineraList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.gasolineraList = this.cleanProperties(arrayGasolineras);
        this.applyFilter(); 
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.applyFilter();
    }
  }

private obtenerPrecio(gasolinera: Gasolinera, fuelType: string): number {
  let precioStr: string | undefined;

  switch (fuelType) {
    case 'Gasolina':
      precioStr = gasolinera.price95;
      break;
    case 'Diesel':
      precioStr = gasolinera.priceDiesel;
      break;
    case 'Hidro':
      precioStr = gasolinera.priceHidro;
      break;
    default:
      return NaN;
  }

  const precio = precioStr ? parseFloat(precioStr.replace(',', '.')) : NaN;
  return precio;
}

private applyFilter() {
  if (!this.filter.fuelType && this.filter.minPrice === 0 && this.filter.maxPrice === 500) {
   
    this.filteredGasolineraList = [...this.gasolineraList];
  } else {

    this.filteredGasolineraList = this.gasolineraList.filter((gasolinera) => {
      const precio = this.obtenerPrecio(gasolinera, this.filter.fuelType);

      const withinPriceRange =
        (this.filter.minPrice == null || (!isNaN(precio) && precio >= this.filter.minPrice)) &&
        (this.filter.maxPrice == null || (!isNaN(precio) && precio <= this.filter.maxPrice));


      if (this.filter.fuelType) {
        return !isNaN(precio) && withinPriceRange;
      }
      return withinPriceRange;
    });
  }
}



  

  private cleanProperties(arrayGasolineras: any): Gasolinera[] {
    return arrayGasolineras.map((gasolineraChusquera: any) => {
      return new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Precio Biodiesel'],
        gasolineraChusquera['Precio Bioetanol'],
        gasolineraChusquera['Precio Gasolina 95 E5'],
        gasolineraChusquera['Precio Gasoleo A'],
        gasolineraChusquera['Precio Hidrogeno'],
        gasolineraChusquera['IDMunicipio'],
        gasolineraChusquera['IDProvincia'],
        gasolineraChusquera['Municipio'],
        gasolineraChusquera['Provincia'],
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Latitud'],
        gasolineraChusquera['Longitud (WGS84)']
      );
    });
  }
}
