import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Gasolinera } from '../models/gasolinera.dto';
import { PostalCode } from '../models/cp.interface';
import { GasolineraListComponent } from '../components/gasolinera-list/gasolinera-list.component';

@Injectable({
  providedIn: 'root'
})
export class GasolineraListService {

  constructor(private http: HttpClient) {}

  getGasolineraList() {
    return this.http.get('http://localhost:3000/ListaEESSPrecio');
    //return this.http.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'); 
  }

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

  cleanProperties(arrayGasolineras: any) {
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
    });
    return newArray;
  }
}
