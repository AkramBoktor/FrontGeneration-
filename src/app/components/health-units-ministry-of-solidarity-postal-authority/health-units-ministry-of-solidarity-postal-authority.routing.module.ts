
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HealthUnitsMinistryOfSolidarityPostalAuthorityComponent } from './health-units-ministry-of-solidarity-postal-authority.component';


const routes: Routes = [
  {
    path: '',
    component: HealthUnitsMinistryOfSolidarityPostalAuthorityComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class HealthUnitsMinistryOfSolidarityPostalAuthorityRoutingModule {
}

