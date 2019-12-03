import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CodeOfVariousActivityOfApprovedCompaniesGuard } from './shared/code-of-various-activity-of-approved-companies.guard';
import { CodeOfVariousActivityOfApprovedCompaniesNewComponent } from './code-of-various-activity-of-approved-companies-new/code-of-various-activity-of-approved-companies-new.component';
import { CodeOfVariousActivityOfApprovedCompaniesEditComponent } from './code-of-various-activity-of-approved-companies-edit/code-of-various-activity-of-approved-companies-edit.component';
import { CodeOfVariousActivityOfApprovedCompaniesListComponent } from './code-of-various-activity-of-approved-companies-list/code-of-various-activity-of-approved-companies-list.component';
import { CodeOfVariousActivityOfApprovedCompaniesViewComponent } from './code-of-various-activity-of-approved-companies-view/code-of-various-activity-of-approved-companies-view.component';

const routes: Routes = [
  {
    path: '',
    component: CodeOfVariousActivityOfApprovedCompaniesListComponent,
    canActivate: [CodeOfVariousActivityOfApprovedCompaniesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CodeOfVariousActivityOfApprovedCompaniesNewComponent,
    canActivate: [CodeOfVariousActivityOfApprovedCompaniesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CodeOfVariousActivityOfApprovedCompaniesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CodeOfVariousActivityOfApprovedCompaniesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CodeOfVariousActivityOfApprovedCompaniesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CodeOfVariousActivityOfApprovedCompaniesRoutingModule {
}
