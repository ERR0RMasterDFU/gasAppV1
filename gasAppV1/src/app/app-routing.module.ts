import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasolineraListComponent } from './components/gasolinera-list/gasolinera-list.component';

const routes: Routes = [
  /*{path:'gasolineras/:codigoPostal', component: GasolineraListComponent},
  {path: '', redirectTo: 'gasolineras/:codigoPostal', pathMatch: 'full'}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
