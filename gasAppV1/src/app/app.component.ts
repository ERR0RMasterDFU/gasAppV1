import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gasAppV1';
  filtro = { fuelType: '' };

  recibirTipo($event: { fuelType: string; }) {
    this.filtro = $event;
  }
}
