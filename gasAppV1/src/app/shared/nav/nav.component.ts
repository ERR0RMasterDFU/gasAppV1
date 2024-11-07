import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  @Output() codPosDelHijo = new EventEmitter<string>();

  codPost: string | undefined;

  // Método que maneja el evento recibido del hijo.
  recibircodPost(codPostHijo: string) {
    this.codPost = codPostHijo;
  }

  enviarCodPost() {
    this.codPosDelHijo.emit(this.codPost);
  }
}
