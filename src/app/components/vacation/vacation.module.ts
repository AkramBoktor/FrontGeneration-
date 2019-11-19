
    import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VacationComponent } from './vacation.component';
import { VacationRoutingModule } from './vacation.routing.module';

@NgModule({
  declarations: [VacationComponent],
  imports: [
    VacationRoutingModule,
    CommonModule,
  ]
})
export class VacationModule { }

