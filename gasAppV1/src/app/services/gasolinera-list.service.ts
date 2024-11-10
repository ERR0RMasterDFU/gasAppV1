import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Gasolinera } from '../models/gasolinera.dto';
import { PostalCode } from '../models/cp.interface';

@Injectable({
  providedIn: 'root'
})
export class GasolineraListService {

  constructor(private http: HttpClient) {}

  getGasolineraList() {
    return this.http.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'); 
  }

  /*getGasolineraList(): Observable<Gasolinera> {
    return this.http.get<Gasolinera>('http://localhost:3000/ListaEESSPrecio'); 
  }*/

  getPostalCodeList(): Observable<PostalCode[]> {
    return this.http.get<PostalCode[]>('http://localhost:3000/code-list');
  }

  getGasolinerasPorCCAA(idCCAA: string): Observable<Gasolinera[]> {
    const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${idCCAA}`;
    return this.http.get<any>(url).pipe(
      map((response) => this.cleanProperties(response.ListaEESSPrecio)),
      catchError((error) => {
        console.error('Error al obtener las gasolineras por CCAA:', error);
        return of([]);
      })
    );
  }

    /*.pipe(
      map(response => {
        console.log('Respuesta de la API:', response);
        // Verifica si la respuesta contiene la propiedad 'gasolinera-list'
        if (response && Array.isArray(response['ListaEESSPrecio'])) {
          return this.cleanProperties(response['ListaEESSPrecio']);
        } else {
          console.error('No se encontró "ListaEESSPrecio" en la respuesta de la API');
          return [];
        }
      }),
      catchError(error => {
        console.error('Error al obtener las gasolineras: ', error);
        return of([]);  // Retorna un array vacío en caso de error
      })
    );
  }*/

  private cleanProperties(arrayGasolineras: any[]): Gasolinera[] {  // Limpia y mapea los datos para que sean correctos.
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

  /*getGasolineraList(): Observable<Gasolinera[]> {
    //return this.http.get<Gasolinera>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
    return this.http.get<Gasolinera[]>('http://localhost:3000/gasolinera-list');
  }*/

}
