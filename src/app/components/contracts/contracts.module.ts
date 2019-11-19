
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsRoutingModule } from './contracts.routing.module';
import { ContractsComponent } from './contracts.component';

@NgModule({
  declarations: [ContractsComponent],
  imports: [
    ContractsRoutingModule,
    CommonModule,
  ]
})
export class ContractsModule { }

