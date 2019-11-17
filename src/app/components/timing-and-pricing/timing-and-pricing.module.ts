
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimingAndPricingRoutingModule } from './timing-and-pricing.routing.module';
import { TimingAndPricingComponent } from './timing-and-pricing.component';

@NgModule({
  declarations: [TimingAndPricingComponent],
  imports: [
    TimingAndPricingRoutingModule,
    CommonModule,
  ]
})
export class TimingAndPricingModule { }

