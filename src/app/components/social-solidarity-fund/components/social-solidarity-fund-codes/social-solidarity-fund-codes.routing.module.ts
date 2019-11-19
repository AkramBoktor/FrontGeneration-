import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSolidarityFundCodesGuard } from './shared/social-solidarity-fund-codes.guard';
import { SocialSolidarityFundCodesNewComponent } from './social-solidarity-fund-codes-new/social-solidarity-fund-codes-new.component';
import { SocialSolidarityFundCodesEditComponent } from './social-solidarity-fund-codes-edit/social-solidarity-fund-codes-edit.component';
import { SocialSolidarityFundCodesListComponent } from './social-solidarity-fund-codes-list/social-solidarity-fund-codes-list.component';
import { SocialSolidarityFundCodesViewComponent } from './social-solidarity-fund-codes-view/social-solidarity-fund-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: SocialSolidarityFundCodesListComponent,
    canActivate: [SocialSolidarityFundCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SocialSolidarityFundCodesNewComponent,
    canActivate: [SocialSolidarityFundCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SocialSolidarityFundCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SocialSolidarityFundCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SocialSolidarityFundCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSolidarityFundCodesRoutingModule {
}
