
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundAComponent } from './social-solidarity-fund-a.component';


const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundAComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundARoutingModule {
}

