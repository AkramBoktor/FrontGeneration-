
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RentedBuildingsComponent } from './rented-buildings.component';


const routes: Routes = [
  {
    path: '',
    component: RentedBuildingsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RentedBuildingsRoutingModule {
}

