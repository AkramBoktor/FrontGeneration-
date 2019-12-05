import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { StatementsByTheAuditCommitteeGuard } from './shared/statements-by-the-audit-committee.guard';
import { StatementsByTheAuditCommitteeNewComponent } from './statements-by-the-audit-committee-new/statements-by-the-audit-committee-new.component';
import { StatementsByTheAuditCommitteeEditComponent } from './statements-by-the-audit-committee-edit/statements-by-the-audit-committee-edit.component';
import { StatementsByTheAuditCommitteeListComponent } from './statements-by-the-audit-committee-list/statements-by-the-audit-committee-list.component';
import { StatementsByTheAuditCommitteeViewComponent } from './statements-by-the-audit-committee-view/statements-by-the-audit-committee-view.component';

const routes: Routes = [
  {
    path: '',
    component: StatementsByTheAuditCommitteeListComponent,
    canActivate: [StatementsByTheAuditCommitteeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: StatementsByTheAuditCommitteeNewComponent,
    canActivate: [StatementsByTheAuditCommitteeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: StatementsByTheAuditCommitteeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: StatementsByTheAuditCommitteeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: StatementsByTheAuditCommitteeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class StatementsByTheAuditCommitteeRoutingModule {
}
