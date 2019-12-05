import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProducingMaterialForApprovedCompaniesGuard } from './shared/producing-material-for-approved-companies.guard';
import { ProducingMaterialForApprovedCompaniesNewComponent } from './producing-material-for-approved-companies-new/producing-material-for-approved-companies-new.component';
import { ProducingMaterialForApprovedCompaniesEditComponent } from './producing-material-for-approved-companies-edit/producing-material-for-approved-companies-edit.component';
import { ProducingMaterialForApprovedCompaniesListComponent } from './producing-material-for-approved-companies-list/producing-material-for-approved-companies-list.component';
import { ProducingMaterialForApprovedCompaniesViewComponent } from './producing-material-for-approved-companies-view/producing-material-for-approved-companies-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProducingMaterialForApprovedCompaniesListComponent,
    canActivate: [ProducingMaterialForApprovedCompaniesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ProducingMaterialForApprovedCompaniesNewComponent,
    canActivate: [ProducingMaterialForApprovedCompaniesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ProducingMaterialForApprovedCompaniesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ProducingMaterialForApprovedCompaniesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ProducingMaterialForApprovedCompaniesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProducingMaterialForApprovedCompaniesRoutingModule {
}
