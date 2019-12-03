import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CodeOfApprovedCompaniesRepresentativeGuard } from './shared/code-of-approved-companies-representative.guard';
import { CodeOfApprovedCompaniesRepresentativeNewComponent } from './code-of-approved-companies-representative-new/code-of-approved-companies-representative-new.component';
import { CodeOfApprovedCompaniesRepresentativeEditComponent } from './code-of-approved-companies-representative-edit/code-of-approved-companies-representative-edit.component';
import { CodeOfApprovedCompaniesRepresentativeListComponent } from './code-of-approved-companies-representative-list/code-of-approved-companies-representative-list.component';
import { CodeOfApprovedCompaniesRepresentativeViewComponent } from './code-of-approved-companies-representative-view/code-of-approved-companies-representative-view.component';

const routes: Routes = [
  {
    path: '',
    component: CodeOfApprovedCompaniesRepresentativeListComponent,
    canActivate: [CodeOfApprovedCompaniesRepresentativeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CodeOfApprovedCompaniesRepresentativeNewComponent,
    canActivate: [CodeOfApprovedCompaniesRepresentativeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CodeOfApprovedCompaniesRepresentativeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CodeOfApprovedCompaniesRepresentativeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CodeOfApprovedCompaniesRepresentativeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CodeOfApprovedCompaniesRepresentativeRoutingModule {
}
