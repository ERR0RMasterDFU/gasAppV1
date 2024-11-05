import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GasolineraListResponse } from '../models/gas.interface';

@Injectable({
  providedIn: 'root'
})
export class GasolineraListService {

  constructor(private http: HttpClient) {}

  getGasolineraList(): Observable<GasolineraListResponse> {
    return this.http.get<GasolineraListResponse>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
  }

  /*getPokemon(name: string): Observable<PokemonDetailResponse> {
    return this.http.get<PokemonDetailResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }*/
}
