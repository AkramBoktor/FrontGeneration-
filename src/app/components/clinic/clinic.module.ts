
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicRoutingModule } from './clinic.routing.module';
import { ClinicComponent } from './clinic.component';

@NgModule({
  declarations: [ClinicComponent],
  imports: [
    ClinicRoutingModule,
    CommonModule,
  ]
})
export class ClinicModule { }

