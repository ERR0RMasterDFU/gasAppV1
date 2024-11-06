import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GasolineraListComponent } from './components/gasolinera-list/gasolinera-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    GasolineraListComponent,
    NavComponent,
    HeaderComponent,
    NavComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    provideHttpClient(), 
    provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
