
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { WeightsDifferencesComponent } from './weights-differences.component';


const routes: Routes = [
  {
    path: '',
    component: WeightsDifferencesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class WeightsDifferencesRoutingModule {
}

