import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GasolineraListService } from '../../services/gasolinera-list.service';
import { Gasolinera } from '../../models/gasolinera.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrl: './gasolinera-list.component.css'
})
export class GasolineraListComponent implements OnInit, OnChanges {
    
  filteredGasolineras: Gasolinera[] = [];
  allGasolineras: Gasolinera[] = []; // Todas las gasolineras
  @Input() codigoPostal: string | undefined; // Código postal que se obtiene: GasolineraList < Screen < Nav < Autocomplete.

  constructor(private gasolineraService: GasolineraListService) { }

  ngOnInit(): void {
    this.gasolineraService.getGasolineraList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData;
        this.allGasolineras = this.cleanProperties(arrayGasolineras);
        this.filteredGasolineras = this.allGasolineras;
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codigoPostal']) {
      this.filterGasolinerasByPostalCode();
    }
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
     
      let gasolinera = new Gasolinera(
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

      newArray.push(gasolinera);
    });
    return newArray;
  }

  filterGasolinerasByPostalCode() {
    this.filteredGasolineras = [];
    
    if(this.codigoPostal){
      for (let gasolinera of this.allGasolineras) {
        if (this.codigoPostal === gasolinera.postalCode) {
          this.filteredGasolineras.push(gasolinera);
        }
      }
    }
  }
}
