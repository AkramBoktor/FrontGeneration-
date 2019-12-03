import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ApprovalForEquippingSchoolsApprovalsGuard } from './shared/approval-for-equipping-schools-approvals.guard';
import { ApprovalForEquippingSchoolsApprovalsNewComponent } from './approval-for-equipping-schools-approvals-new/approval-for-equipping-schools-approvals-new.component';
import { ApprovalForEquippingSchoolsApprovalsEditComponent } from './approval-for-equipping-schools-approvals-edit/approval-for-equipping-schools-approvals-edit.component';
import { ApprovalForEquippingSchoolsApprovalsListComponent } from './approval-for-equipping-schools-approvals-list/approval-for-equipping-schools-approvals-list.component';
import { ApprovalForEquippingSchoolsApprovalsViewComponent } from './approval-for-equipping-schools-approvals-view/approval-for-equipping-schools-approvals-view.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalForEquippingSchoolsApprovalsListComponent,
    canActivate: [ApprovalForEquippingSchoolsApprovalsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ApprovalForEquippingSchoolsApprovalsNewComponent,
    canActivate: [ApprovalForEquippingSchoolsApprovalsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ApprovalForEquippingSchoolsApprovalsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ApprovalForEquippingSchoolsApprovalsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ApprovalForEquippingSchoolsApprovalsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ApprovalForEquippingSchoolsApprovalsRoutingModule {
}
