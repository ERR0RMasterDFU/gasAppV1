import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'googleMapsLink'
})
export class GoogleMapsLinkPipe implements PipeTransform {

  transform(latitud: string, longitud: string): string {

    let latitudCorrecta = latitud.replace(",",".");
    let longitudCorrecta = longitud.replace(",",".");

    return `https://maps.google.com/?q=${latitudCorrecta},${longitudCorrecta}&ll=${latitudCorrecta},${longitudCorrecta}&z=18`;
  }

}
