
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternationalCooperationRoutingModule } from './international-cooperation.routing.module';
import { InternationalCooperationComponent } from './international-cooperation.component';

@NgModule({
  declarations: [InternationalCooperationComponent],
  imports: [
    InternationalCooperationRoutingModule,
    CommonModule,
  ]
})
export class InternationalCooperationModule { }

