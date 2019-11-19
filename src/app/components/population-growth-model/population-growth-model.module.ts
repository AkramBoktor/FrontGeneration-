
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopulationGrowthModelRoutingModule } from './population-growth-model.routing.module';
import { PopulationGrowthModelComponent } from './population-growth-model.component';

@NgModule({
  declarations: [PopulationGrowthModelComponent],
  imports: [
    PopulationGrowthModelRoutingModule,
    CommonModule,
  ]
})
export class PopulationGrowthModelModule { }

