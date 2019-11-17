import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PeopleAssemblyApprovalGuard } from './shared/people-assembly-approval.guard';
import { PeopleAssemblyApprovalNewComponent } from './people-assembly-approval-new/people-assembly-approval-new.component';
import { PeopleAssemblyApprovalEditComponent } from './people-assembly-approval-edit/people-assembly-approval-edit.component';
import { PeopleAssemblyApprovalListComponent } from './people-assembly-approval-list/people-assembly-approval-list.component';
import { PeopleAssemblyApprovalViewComponent } from './people-assembly-approval-view/people-assembly-approval-view.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleAssemblyApprovalListComponent,
    canActivate: [PeopleAssemblyApprovalGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PeopleAssemblyApprovalNewComponent,
    canActivate: [PeopleAssemblyApprovalGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PeopleAssemblyApprovalEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PeopleAssemblyApprovalListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PeopleAssemblyApprovalViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PeopleAssemblyApprovalRoutingModule {
}
