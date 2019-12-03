
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthUnitsMinistryOfSolidarityPostalAuthorityRoutingModule } from './health-units-ministry.routing.module';
import { HealthUnitsMinistryOfSolidarityPostalAuthorityComponent } from './health-units-ministry.component';

@NgModule({
  declarations: [HealthUnitsMinistryOfSolidarityPostalAuthorityComponent],
  imports: [
    HealthUnitsMinistryOfSolidarityPostalAuthorityRoutingModule,
    CommonModule,
  ]
})
export class HealthUnitsMinistryOfSolidarityPostalAuthorityModule { }

