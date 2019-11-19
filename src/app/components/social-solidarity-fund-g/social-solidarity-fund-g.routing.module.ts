
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundGComponent } from './social-solidarity-fund-g.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundGComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundGRoutingModule {
}

