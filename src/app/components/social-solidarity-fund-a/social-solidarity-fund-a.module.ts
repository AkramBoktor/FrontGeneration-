
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialSolidarityFundARoutingModule } from './social-solidarity-fund-a.routing.module';
import { SocialSolidarityFundAComponent } from './social-solidarity-fund-a.component';

@NgModule({
  declarations: [SocialSolidarityFundAComponent],
  imports: [
    SocialSolidarityFundARoutingModule,
    CommonModule,
  ]
})
export class SocialSolidarityFundAModule { }

