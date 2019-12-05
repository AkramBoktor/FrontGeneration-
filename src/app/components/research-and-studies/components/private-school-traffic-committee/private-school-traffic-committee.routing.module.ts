import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PrivateSchoolTrafficCommitteeGuard } from './shared/private-school-traffic-committee.guard';
import { PrivateSchoolTrafficCommitteeNewComponent } from './private-school-traffic-committee-new/private-school-traffic-committee-new.component';
import { PrivateSchoolTrafficCommitteeEditComponent } from './private-school-traffic-committee-edit/private-school-traffic-committee-edit.component';
import { PrivateSchoolTrafficCommitteeListComponent } from './private-school-traffic-committee-list/private-school-traffic-committee-list.component';
import { PrivateSchoolTrafficCommitteeViewComponent } from './private-school-traffic-committee-view/private-school-traffic-committee-view.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateSchoolTrafficCommitteeListComponent,
    canActivate: [PrivateSchoolTrafficCommitteeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PrivateSchoolTrafficCommitteeNewComponent,
    canActivate: [PrivateSchoolTrafficCommitteeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PrivateSchoolTrafficCommitteeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PrivateSchoolTrafficCommitteeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PrivateSchoolTrafficCommitteeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PrivateSchoolTrafficCommitteeRoutingModule {
}
