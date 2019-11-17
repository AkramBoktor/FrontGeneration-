
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee.routing.module';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    EmployeeRoutingModule,
    CommonModule,
  ]
})
export class EmployeeModule { }

