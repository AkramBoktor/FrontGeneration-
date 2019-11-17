import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FollowupRequestToNewAgencyGuard } from './shared/followup-request-to-new-agency.guard';
import { FollowupRequestToNewAgencyNewComponent } from './followup-request-to-new-agency-new/followup-request-to-new-agency-new.component';
import { FollowupRequestToNewAgencyEditComponent } from './followup-request-to-new-agency-edit/followup-request-to-new-agency-edit.component';
import { FollowupRequestToNewAgencyListComponent } from './followup-request-to-new-agency-list/followup-request-to-new-agency-list.component';
import { FollowupRequestToNewAgencyViewComponent } from './followup-request-to-new-agency-view/followup-request-to-new-agency-view.component';

const routes: Routes = [
  {
    path: '',
    component: FollowupRequestToNewAgencyListComponent,
    canActivate: [FollowupRequestToNewAgencyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FollowupRequestToNewAgencyNewComponent,
    canActivate: [FollowupRequestToNewAgencyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FollowupRequestToNewAgencyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FollowupRequestToNewAgencyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FollowupRequestToNewAgencyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FollowupRequestToNewAgencyRoutingModule {
}
