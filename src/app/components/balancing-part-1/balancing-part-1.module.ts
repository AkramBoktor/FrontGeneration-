
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalancingPart1RoutingModule } from './balancing-part-1.routing.module';
import { BalancingPart1Component } from './balancing-part-1.component';

@NgModule({
  declarations: [BalancingPart1Component],
  imports: [
    BalancingPart1RoutingModule,
    CommonModule,
  ]
})
export class BalancingPart1Module { }

