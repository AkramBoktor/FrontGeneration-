
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimingAndPricingComponent } from './timing-and-pricing.component';


const routes: Routes = [
  {
    path: '',
    component: TimingAndPricingComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimingAndPricingRoutingModule {
}

