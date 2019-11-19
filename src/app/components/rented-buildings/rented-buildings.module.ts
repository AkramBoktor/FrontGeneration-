
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentedBuildingsRoutingModule } from './rented-buildings.routing.module';
import { RentedBuildingsComponent } from './rented-buildings.component';

@NgModule({
  declarations: [RentedBuildingsComponent],
  imports: [
    RentedBuildingsRoutingModule,
    CommonModule,
  ]
})
export class RentedBuildingsModule { }

