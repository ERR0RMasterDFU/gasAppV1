import { Component } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
 
  // VARIABLES FC
  //filtro = { fuelType: '', minPrice: 0, maxPrice: 0 };
  fuelTypeDef: string | undefined;
  minPriceDef: number = 0;
  maxPriceDef: number = 3;
  

  // VARIABLES FCP
  codPostDef: string | undefined;   

  selectedCCAA: string | null = null;

  /* MÉTODOS FC
  recibirTipo($event: { fuelType: string, minPrice: number, maxPrice: number }) {
    this.filtro = $event;
  }*/

  recibirTresValoresNav(event: { fuelTypeNav: string, minPriceNav: number, maxPriceNav: number }) {
    this.fuelTypeDef = event.fuelTypeNav;
    this.minPriceDef = event.minPriceNav;
    this.maxPriceDef = event.maxPriceNav;
  }

  // MÉTODOS FCP
  recibircodPostNav(codPostNav: string) {
    this.codPostDef = codPostNav;
  }

  onCCAASelected(ccaaId: string) {
    this.selectedCCAA = ccaaId;
  }

}
