import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FollowupDataOnTheSaleOfLandGuard } from './shared/followup-data-on-the-sale-of-land.guard';
import { FollowupDataOnTheSaleOfLandNewComponent } from './followup-data-on-the-sale-of-land-new/followup-data-on-the-sale-of-land-new.component';
import { FollowupDataOnTheSaleOfLandEditComponent } from './followup-data-on-the-sale-of-land-edit/followup-data-on-the-sale-of-land-edit.component';
import { FollowupDataOnTheSaleOfLandListComponent } from './followup-data-on-the-sale-of-land-list/followup-data-on-the-sale-of-land-list.component';
import { FollowupDataOnTheSaleOfLandViewComponent } from './followup-data-on-the-sale-of-land-view/followup-data-on-the-sale-of-land-view.component';

const routes: Routes = [
  {
    path: '',
    component: FollowupDataOnTheSaleOfLandListComponent,
    canActivate: [FollowupDataOnTheSaleOfLandGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FollowupDataOnTheSaleOfLandNewComponent,
    canActivate: [FollowupDataOnTheSaleOfLandGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FollowupDataOnTheSaleOfLandEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FollowupDataOnTheSaleOfLandListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FollowupDataOnTheSaleOfLandViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FollowupDataOnTheSaleOfLandRoutingModule {
}
