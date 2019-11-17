
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightsDifferencesRoutingModule } from './weights-differences.routing.module';
import { WeightsDifferencesComponent } from './weights-differences.component';

@NgModule({
  declarations: [WeightsDifferencesComponent],
  imports: [
    WeightsDifferencesRoutingModule,
    CommonModule,
  ]
})
export class WeightsDifferencesModule { }

