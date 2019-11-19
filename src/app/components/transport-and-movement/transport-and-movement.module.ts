
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportAndMovementRoutingModule } from './transport-and-movement.routing.module';
import { TransportAndMovementComponent } from './transport-and-movement.component';

@NgModule({
  declarations: [TransportAndMovementComponent],
  imports: [
    TransportAndMovementRoutingModule,
    CommonModule,
  ]
})
export class TransportAndMovementModule { }

