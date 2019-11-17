
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpropriationRoutingModule } from './expropriation.routing.module';
import { ExpropriationComponent } from './expropriation.component';

@NgModule({
  declarations: [ExpropriationComponent],
  imports: [
    ExpropriationRoutingModule,
    CommonModule,
  ]
})
export class ExpropriationModule { }

