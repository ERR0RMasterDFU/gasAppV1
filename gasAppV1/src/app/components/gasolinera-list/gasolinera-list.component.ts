import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GasolineraListService } from '../../services/gasolinera-list.service';
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrls: ['./gasolinera-list.component.css']
})
export class GasolineraListComponent implements OnInit, OnChanges {

  filteredGasolineras: Gasolinera[] = [];
  allGasolineras: Gasolinera[] = []; // Todas las gasolineras
  
  gasolineraList: Gasolinera[] = [];
  filteredGasolineraList: Gasolinera[] = [];
  
  @Input() codigoPostal: string | undefined;
  
  @Input() filter = { fuelType: '', minPrice: 0, maxPrice: 0 };
  
  @Input() ccaaFilter: string = '';

  @Input() provinceFilter: string = '';

  constructor(private gasolineraService: GasolineraListService) {}

  ngOnInit(): void {
    this.gasolineraService.getGasolineraList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.allGasolineras = this.cleanProperties(arrayGasolineras);
        this.filteredGasolineras = this.allGasolineras;
        console.log('Gasolineras:', this.filteredGasolineras);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any[]): Gasolinera[] {
    return arrayGasolineras.map(gasolineraChusquera => {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codigoPostal']) {
      this.filterGasolinerasByPostalCode();
    }
  
    if (changes['filter']) {
      this.applyFilter();
    }
  
    if (changes['ccaaFilter']) {
      this.applyCcaaFilter();
    }
  
    if (changes['provinceFilter']) {
      this.applyProvinceFilter(); 
    }
  }
  

  private applyCcaaFilter() {
    if (this.ccaaFilter) {
      this.gasolineraService.getGasolinerasPorCCAA(this.ccaaFilter).subscribe(filteredGasolineras => {
        this.filteredGasolineras = filteredGasolineras;
        console.log('Gasolineras filtradas por CCAA:', this.filteredGasolineras);
  
        if (this.provinceFilter) {
          this.applyProvinceFilter();
        }
      });
    } else {
      this.filteredGasolineras = this.allGasolineras;
    }
  }
  
  

  private applyProvinceFilter() {
    if (this.provinceFilter) {
      this.filteredGasolineras = this.filteredGasolineras.filter(gasolinera =>
        gasolinera.provincia && gasolinera.provincia.toLowerCase().includes(this.provinceFilter.toLowerCase())
      );
      console.log('Gasolineras después de aplicar filtro por provincia:', this.filteredGasolineras);
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
      this.filteredGasolineras = [...this.allGasolineras];
    } else {
      this.filteredGasolineras = this.allGasolineras.filter((gasolinera) => {
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

  private filterGasolinerasByPostalCode() {
    this.filteredGasolineras = [];

    if (this.codigoPostal) {
      for (let gasolinera of this.allGasolineras) {
        if (this.codigoPostal === gasolinera.postalCode) {
          this.filteredGasolineras.push(gasolinera);
        }
      }
    }
  }
}
