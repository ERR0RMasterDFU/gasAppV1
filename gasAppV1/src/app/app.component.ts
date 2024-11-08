import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gasAppV1';

  codPostDef:string = '';

  recibircodPostApp(codPostNav: string) {
    console.log("Código postal recibido en App: ", codPostNav);
    this.codPostDef = codPostNav;
  }

}


