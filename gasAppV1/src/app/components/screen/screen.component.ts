import { Component } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {

  codPostDef: string | undefined;

  recibircodPostNav(codPostNav: string) {
    this.codPostDef = codPostNav;
  }

}
