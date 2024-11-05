import { Component } from '@angular/core';
import { Gasolinera } from '../../models/gas.interface';
import { GasolineraListService } from '../../services/gasolinera-list.service';

@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrl: './gasolinera-list.component.css'
})
export class GasolineraListComponent {
    
  gasolineraList: Gasolinera[] = [];

  constructor(private gasolineraService: GasolineraListService) { }
  
  ngOnInit(): void {
    this.gasolineraService.getGasolineraList().subscribe((response) => {
      this.gasolineraList = response.ListaEESSPrecio;
    });
  }

}
