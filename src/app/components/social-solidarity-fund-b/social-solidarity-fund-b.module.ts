
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialSolidarityFundBRoutingModule } from './social-solidarity-fund-b.routing.module';
import { SocialSolidarityFundBComponent } from './social-solidarity-fund-b.component';

@NgModule({
  declarations: [SocialSolidarityFundBComponent],
  imports: [
    SocialSolidarityFundBRoutingModule,
    CommonModule,
  ]
})
export class SocialSolidarityFundBModule { }

