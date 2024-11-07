import { Component, Input } from '@angular/core';
import { GasolineraListService } from '../../services/gasolinera-list.service';
import { Gasolinera } from '../../models/gasolinera.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrl: './gasolinera-list.component.css'
})
export class GasolineraListComponent {
    
  gasolineraList: Gasolinera[] = [];
  allGasolineras: Gasolinera[] = []; // Para almacenar todas las gasolineras
  codigoPostal: string = ''; // Código postal que se obtiene desde la ruta

  constructor(private gasolineraService: GasolineraListService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Obtener el valor del parámetro de ruta
    this.route.params.subscribe(params => {
      this.codigoPostal = params['codigoPostal'];
    });
  }

  loadGasolineras() {
    this.gasolineraService.getGasolineraList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.allGasolineras = this.cleanProperties(arrayGasolineras);
        this.filterGasolineras();  // Filtrar las gasolineras según el código postal
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      const gasolineraConNombresGuenos: any = {};

      // Recorro los nombres de los atributo de la
      // gasolineraChusquera que están mal escritos
      /*Object.keys(gasolineraChusquera).forEach((key) => {
        // En la variable key tengo el nombre de la
        // propiedad que estoy recorriendo
        if (key === 'C.P.') {
          gasolineraConNombresGuenos['postalCode'] = gasolineraChusquera[key];
        }
      });
      */
     
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

  // Método para filtrar gasolineras por código postal
  filterGasolineras() {
    if (this.codigoPostal) {
      // Si hay un código postal, filtramos las gasolineras
      this.gasolineraList = this.allGasolineras.filter(gasolineras => gasolineras.postalCode === this.codigoPostal);
    } else {
      // Si no hay código postal, mostramos todas las gasolineras
      this.gasolineraList = this.allGasolineras;
    }
  }

}
