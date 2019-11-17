
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PopulationGrowthModelComponent } from './population-growth-model.component';


const routes: Routes = [
  {
    path: '',
    component: PopulationGrowthModelComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PopulationGrowthModelRoutingModule {
}

