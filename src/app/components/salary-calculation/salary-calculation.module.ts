
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryCalculationRoutingModule } from './salary-calculation.routing.module';
import { SalaryCalculationComponent } from './salary-calculation.component';

@NgModule({
  declarations: [SalaryCalculationComponent],
  imports: [
    SalaryCalculationRoutingModule,
    CommonModule,
  ]
})
export class SalaryCalculationModule { }

