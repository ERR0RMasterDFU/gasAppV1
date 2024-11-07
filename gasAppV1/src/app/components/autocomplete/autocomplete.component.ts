import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GasolineraListService } from '../../services/gasolinera-list.service';
import { PostalCode } from '../../models/cp.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit {

  myControl = new FormControl('');

  options: string[] = [];
  listadoCP: PostalCode[] = []
  filteredOptions: Observable<string[]> | undefined;

  @Input() codPost:string | undefined;
  @Output() codPostElegido = new EventEmitter<string>();

  constructor(private gasolineraService: GasolineraListService, private router: Router){}

  enviarCodPost() {
    this.codPostElegido.emit(this.codPost);

    if (this.codPost) {
      // Navegar a la ruta con el código postal seleccionado
      this.router.navigate(['/gasolineras', this.codPost]);
    } else {
      // Si no se selecciona código postal, redirigir a la ruta de gasolineras sin filtro
      this.router.navigate(['/gasolineras']);
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