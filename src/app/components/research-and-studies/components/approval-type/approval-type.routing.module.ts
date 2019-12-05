import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ApprovalTypeGuard } from './shared/approval-type.guard';
import { ApprovalTypeNewComponent } from './approval-type-new/approval-type-new.component';
import { ApprovalTypeEditComponent } from './approval-type-edit/approval-type-edit.component';
import { ApprovalTypeListComponent } from './approval-type-list/approval-type-list.component';
import { ApprovalTypeViewComponent } from './approval-type-view/approval-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalTypeListComponent,
    canActivate: [ApprovalTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ApprovalTypeNewComponent,
    canActivate: [ApprovalTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ApprovalTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ApprovalTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ApprovalTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ApprovalTypeRoutingModule {
}
