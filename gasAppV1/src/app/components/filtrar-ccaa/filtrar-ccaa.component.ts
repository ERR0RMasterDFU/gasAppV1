import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtrar-ccaa',
  templateUrl: './filtrar-ccaa.component.html',
})
export class FiltrarCcaaComponent {

  @Output() ccaaSelected = new EventEmitter<string>();
  selectedCCAA: string = ''; // Almacena el valor seleccionado

  onCCAASelect(ccaaId: string) {
    this.ccaaSelected.emit(ccaaId);
  }
}
