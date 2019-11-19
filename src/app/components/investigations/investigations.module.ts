
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigationsRoutingModule } from './investigations.routing.module';
import { InvestigationsComponent } from './investigations.component';

@NgModule({
  declarations: [InvestigationsComponent],
  imports: [
    InvestigationsRoutingModule,
    CommonModule,
  ]
})
export class InvestigationsModule { }

