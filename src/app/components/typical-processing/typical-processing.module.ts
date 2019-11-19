
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypicalProcessingRoutingModule } from './typical-processing.routing.module';
import { TypicalProcessingComponent } from './typical-processing.component';

@NgModule({
  declarations: [TypicalProcessingComponent],
  imports: [
    TypicalProcessingRoutingModule,
    CommonModule,
  ]
})
export class TypicalProcessingModule { }

