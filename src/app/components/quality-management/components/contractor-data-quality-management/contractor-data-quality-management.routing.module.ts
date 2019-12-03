import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContractorDataQualityManagementGuard } from './shared/contractor-data-quality-management.guard';
import { ContractorDataQualityManagementNewComponent } from './contractor-data-quality-management-new/contractor-data-quality-management-new.component';
import { ContractorDataQualityManagementEditComponent } from './contractor-data-quality-management-edit/contractor-data-quality-management-edit.component';
import { ContractorDataQualityManagementListComponent } from './contractor-data-quality-management-list/contractor-data-quality-management-list.component';
import { ContractorDataQualityManagementViewComponent } from './contractor-data-quality-management-view/contractor-data-quality-management-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorDataQualityManagementListComponent,
    canActivate: [ContractorDataQualityManagementGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractorDataQualityManagementNewComponent,
    canActivate: [ContractorDataQualityManagementGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractorDataQualityManagementEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractorDataQualityManagementListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractorDataQualityManagementViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractorDataQualityManagementRoutingModule {
}
