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
import { GoogleMapsLinkPipe } from './pipes/google-maps-link.pipe';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GasolineraListComponent,
    NavComponent,
    HeaderComponent,
    NavComponent,
    DropdownComponent,
    GoogleMapsLinkPipe,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  providers: [
    provideHttpClient(), 
    provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
