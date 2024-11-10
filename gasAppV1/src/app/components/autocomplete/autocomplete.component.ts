import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GasolineraListService } from '../../services/gasolinera-list.service';
import { PostalCode } from '../../models/cp.interface';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = [];
  listadoCP: PostalCode[] = [];
  filteredOptions: Observable<string[]> | undefined;

  @Output() codPostElegido = new EventEmitter<string>();
 
  constructor(private gasolineraService: GasolineraListService){}

  realizarEnvioANav() {
    if (this.myControl.value) {
      this.codPostElegido.emit(this.myControl.value);  // Emite el valor de myControl
    }
  }

  ngOnInit() {
    this.gasolineraService.getPostalCodeList().subscribe((respuesta) => {
      this.listadoCP = respuesta;
      this.listadoCP.forEach(item => {
        if(this.options.includes(item.codigo_postal.toString())) {

        } else {
          this.options.push(item.codigo_postal.toString())
        }
      });
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}