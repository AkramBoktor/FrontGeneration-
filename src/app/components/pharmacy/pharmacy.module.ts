
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyRoutingModule } from './pharmacy.routing.module';
import { PharmacyComponent } from './pharmacy.component';

@NgModule({
  declarations: [PharmacyComponent],
  imports: [
    PharmacyRoutingModule,
    CommonModule,
  ]
})
export class PharmacyModule { }

