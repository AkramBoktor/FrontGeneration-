
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundBComponent } from './social-solidarity-fund-b.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundBComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundBRoutingModule {
}

