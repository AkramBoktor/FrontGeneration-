
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SalaryCalculationComponent } from './salary-calculation.component';


const routes: Routes = [
  {
    path: '',
    component: SalaryCalculationComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SalaryCalculationRoutingModule {
}

