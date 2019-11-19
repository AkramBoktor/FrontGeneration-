
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundComponent } from './social-solidarity-fund.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundRoutingModule {
}

