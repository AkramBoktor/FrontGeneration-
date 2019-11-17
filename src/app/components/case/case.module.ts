
    import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CaseComponent } from './case.component';
import { CaseRoutingModule } from './case.routing.module';

@NgModule({
  declarations: [CaseComponent],
  imports: [
    CaseRoutingModule,
    CommonModule,
  ]
})
export class CaseModule { }

