import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PrivateSchoolApprovalGuard } from './shared/private-school-approval.guard';
import { PrivateSchoolApprovalNewComponent } from './private-school-approval-new/private-school-approval-new.component';
import { PrivateSchoolApprovalEditComponent } from './private-school-approval-edit/private-school-approval-edit.component';
import { PrivateSchoolApprovalListComponent } from './private-school-approval-list/private-school-approval-list.component';
import { PrivateSchoolApprovalViewComponent } from './private-school-approval-view/private-school-approval-view.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateSchoolApprovalListComponent,
    canActivate: [PrivateSchoolApprovalGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PrivateSchoolApprovalNewComponent,
    canActivate: [PrivateSchoolApprovalGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PrivateSchoolApprovalEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PrivateSchoolApprovalListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PrivateSchoolApprovalViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PrivateSchoolApprovalRoutingModule {
}
