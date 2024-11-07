import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gasAppV1';

  codPost:string | undefined;

  recibircodPost(codPostHijo: string) {
    this.codPost = codPostHijo;
  }
}


