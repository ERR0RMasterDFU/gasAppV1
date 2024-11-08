// gasolinera.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  constructor(private http: HttpClient) {}

  obtenerRangoPrecios(fuelType: string): Observable<{ minPrice: number, maxPrice: number }> {
    return this.http.get<any[]>(`/api/gasolineras`) // Ajusta la URL de tu API
      .pipe(
        map(gasolineras => {
          const precios = gasolineras
            .map(gasolinera => gasolinera[`price${fuelType}`])
            .filter(precio => precio !== null && precio !== undefined);

          const minPrice = Math.min(...precios);
          const maxPrice = Math.max(...precios);

          return { minPrice, maxPrice };
        })
      );
  }
}
