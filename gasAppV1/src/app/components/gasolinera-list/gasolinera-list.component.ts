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
    
  gasolineraList: Gasolinera[] = [];
  allGasolineras: Gasolinera[] = []; // Todas las gasolineras
  @Input() codigoPostal:string = ''; // Código postal que se obtiene desde el padre;

  constructor(private gasolineraService: GasolineraListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Código postal recibido en hijo: ", this.codigoPostal);
    this.loadGasolineras();
    console.log(this.codigoPostal);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si el código postal cambia, filtra las gasolineras
    console.log("Código postal recibido en hijo: ", this.codigoPostal);
    if (changes['codigoPostal']) {
      this.filterGasolineras();
    }
  }

  loadGasolineras() {
    this.gasolineraService.getGasolineraList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData;
        this.allGasolineras = this.cleanProperties(arrayGasolineras);
        this.filterGasolineras();  // Filtra las gasolineras según el código postal
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
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

  /*loadGasolineras() {
    this.gasolineraService.getGasolineraList().subscribe((gasolineras) => {
      this.allGasolineras = gasolineras;
      this.filterGasolineras();  // Filtrar las gasolineras si ya tenemos el código postal
    });
  }*/

  filterGasolineras() {
    debugger;
    if (this.codigoPostal) {
      this.gasolineraList = this.allGasolineras.filter(gasolinera => 
        gasolinera.postalCode === this.codigoPostal);
    } else {
      this.gasolineraList = this.allGasolineras;
    }
  }
}
