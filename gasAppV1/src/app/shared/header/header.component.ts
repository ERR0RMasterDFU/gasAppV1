import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  imagenIzq: string = 'https://www.ariema.com/wp-content/uploads/2022/07/eco2fuel-vec.png'
  imagenDcha: string = 'https://img.freepik.com/premium-photo/hand-holding-3d-rendering-green-gas-pump-nozzle-with-oil-splash_493806-4730.jpg';
}
