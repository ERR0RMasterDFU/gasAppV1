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
  recibircodPost(codPostInput: string) {
    this.codPostNav = codPostInput;
    console.log(this.codPostNav);
  }

  enviarCodPost() {
      if (this.codPostNav) {
        this.codPosElegidoNav.emit(this.codPostNav);  // Emite el valor de codPostNav
      }
    }
  
  onSelectPostalCode() {
    this.enviarCodPost();  // Llamamos a enviarCodPost para emitir el valor seleccionado
  }

}
