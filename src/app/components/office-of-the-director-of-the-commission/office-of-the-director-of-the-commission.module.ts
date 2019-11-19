
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeOfTheDirectorOfTheCommissionRoutingModule } from './office-of-the-director-of-the-commission.routing.module';
import { OfficeOfTheDirectorOfTheCommissionComponent } from './office-of-the-director-of-the-commission.component';

@NgModule({
  declarations: [OfficeOfTheDirectorOfTheCommissionComponent],
  imports: [
    OfficeOfTheDirectorOfTheCommissionRoutingModule,
    CommonModule,
  ]
})
export class OfficeOfTheDirectorOfTheCommissionModule { }

