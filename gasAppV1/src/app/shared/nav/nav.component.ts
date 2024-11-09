import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  @Output() codPosElegidoNav = new EventEmitter<string>();
  codPostNav: string | undefined; 

  // Método que maneja el evento recibido del hijo.
  recibircodPostAutocomplete(codPostAutocomplete: string) {
    this.codPostNav = codPostAutocomplete;
    this.realizarEnvioAScreen();
  }

  realizarEnvioAScreen() {
    if (this.codPostNav) {
      this.codPosElegidoNav.emit(this.codPostNav);  // Emite el valor de codPostNav
    }
  }

}
