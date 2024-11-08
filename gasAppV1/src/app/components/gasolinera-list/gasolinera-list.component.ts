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

  @Input() filter = { fuelType: ''};

  constructor(private gasolineraService: GasolineraListService) {}

  ngOnInit(): void {
    this.gasolineraService.getGasolineraList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.gasolineraList = this.cleanProperties(arrayGasolineras);
        this.applyFilter();  // Aplicamos el filtro tras cargar los datos
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

  private applyFilter() {
    this.filteredGasolineraList = this.gasolineraList.filter((gasolinera) => {
      // Filtros según tipo de combustible
      if (this.filter.fuelType) {
        switch (this.filter.fuelType) {
          case 'Gasolina':
            return gasolinera.price95 !== '';
          case 'Diesel':
            return gasolinera.priceDiesel !== '';
          case 'Hidro':
            return gasolinera.priceHidro !== '';
        }
      }
      return true; // Sin filtro de tipo de combustible
    });
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
