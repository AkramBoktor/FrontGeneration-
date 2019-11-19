
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CooperativeSocietyRoutingModule } from './cooperative-society.routing.module';
import { CooperativeSocietyComponent } from './cooperative-society.component';

@NgModule({
  declarations: [CooperativeSocietyComponent],
  imports: [
    CooperativeSocietyRoutingModule,
    CommonModule,
  ]
})
export class CooperativeSocietyModule { }

