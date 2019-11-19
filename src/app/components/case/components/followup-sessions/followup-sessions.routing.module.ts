import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowupSessionsEditComponent } from './followup-sessions-edit/followup-sessions-edit.component';
import { FollowupSessionsListComponent } from './followup-sessions-list/followup-sessions-list.component';
import { FollowupSessionsNewComponent } from './followup-sessions-new/followup-sessions-new.component';
import { FollowupSessionsViewComponent } from './followup-sessions-view/followup-sessions-view.component';
import { FollowupSessionsGuard } from './shared/followup-sessions.guard';

const routes: Routes = [
  {
    path: '',
    component: FollowupSessionsListComponent,
    canActivate: [FollowupSessionsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FollowupSessionsNewComponent,
    canActivate: [FollowupSessionsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FollowupSessionsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FollowupSessionsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FollowupSessionsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FollowupSessionsRoutingModule {
}
