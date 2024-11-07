import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasolinera } from '../models/gasolinera.dto';
import { PostalCode } from '../models/cp.interface';

@Injectable({
  providedIn: 'root'
})
export class GasolineraListService {

  constructor(private http: HttpClient) {}

  getGasolineraList(): Observable<Gasolinera> {
    return this.http.get<Gasolinera>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
  }

  getPostalCodeList(): Observable<PostalCode[]> {
    return this.http.get<PostalCode[]>('http://localhost:3000/code-list');
  }

  /*getGasolinerasConPostalCode(codigoPostal:string): Observable<PostalCode[]> {
    let gasolineras = this.http.get<PostalCode[]>('http://localhost:3000/code-list');

    if (gasolineras.subscribe) {

    }

  }*/

  /*getPokemon(name: string): Observable<PokemonDetailResponse> {
    return this.http.get<PokemonDetailResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }*/
}
