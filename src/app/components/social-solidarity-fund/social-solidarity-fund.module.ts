
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialSolidarityFundRoutingModule } from './social-solidarity-fund.routing.module';
import { SocialSolidarityFundComponent } from './social-solidarity-fund.component';

@NgModule({
  declarations: [SocialSolidarityFundComponent],
  imports: [
    SocialSolidarityFundRoutingModule,
    CommonModule,
  ]
})
export class SocialSolidarityFundModule { }

