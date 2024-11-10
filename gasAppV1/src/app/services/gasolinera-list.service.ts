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
    return this.http.get('http://localhost:3000/ListaEESSPrecio');
    //return this.http.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'); 
  }

  getPostalCodeList(): Observable<PostalCode[]> {
    return this.http.get<PostalCode[]>('http://localhost:3000/code-list');
  }

}
