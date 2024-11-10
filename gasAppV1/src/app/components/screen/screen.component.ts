import { Component } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
 
  // VARIABLES FC
  //filtro = { fuelType: '' };   
  filtro = { fuelType: '', minPrice: 0, maxPrice: 0 };        

  // VARIABLES FCP
  codPostDef: string | undefined;   

  selectedCCAA: string | null = null;

  // MÉTODOS FC
  //  fuelType: string, minPrice: number, maxPrice: number
  //recibirTipo($event: { fuelType: string; }) {
  recibirTipo($event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.filtro = $event;
  }

  // MÉTODOS FCP
  recibircodPostNav(codPostNav: string) {
    this.codPostDef = codPostNav;
  }

  onCCAASelected(ccaaId: string) {
    this.selectedCCAA = ccaaId;
  }

}
