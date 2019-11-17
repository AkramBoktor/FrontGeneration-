
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProbesRoutingModule } from './probes.routing.module';
import { ProbesComponent } from './probes.component';

@NgModule({
  declarations: [ProbesComponent],
  imports: [
    ProbesRoutingModule,
    CommonModule,
  ]
})
export class ProbesModule { }

