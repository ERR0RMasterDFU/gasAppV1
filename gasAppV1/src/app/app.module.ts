import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GasolineraListComponent } from './components/gasolinera-list/gasolinera-list.component';
import { AsideComponent } from './shared/aside/aside.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    GasolineraListComponent,
    AsideComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
