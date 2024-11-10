import { Component } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
 
  // VARIABLES FC
  filtro = { fuelType: '', minPrice: 0, maxPrice: 0 };        

  // VARIABLES FCP
  codPostDef: string | undefined;   

  // MÉTODOS FC
  recibirTipo($event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.filtro = $event;
  }

  // MÉTODOS FCP
  recibircodPostNav(codPostNav: string) {
    this.codPostDef = codPostNav;
  }
}
