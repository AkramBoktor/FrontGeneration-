import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InsuranceCompaniesCodesGuard } from './shared/insurance-companies-codes.guard';
import { InsuranceCompaniesCodesNewComponent } from './insurance-companies-codes-new/insurance-companies-codes-new.component';
import { InsuranceCompaniesCodesEditComponent } from './insurance-companies-codes-edit/insurance-companies-codes-edit.component';
import { InsuranceCompaniesCodesListComponent } from './insurance-companies-codes-list/insurance-companies-codes-list.component';
import { InsuranceCompaniesCodesViewComponent } from './insurance-companies-codes-view/insurance-companies-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceCompaniesCodesListComponent,
    canActivate: [InsuranceCompaniesCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InsuranceCompaniesCodesNewComponent,
    canActivate: [InsuranceCompaniesCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InsuranceCompaniesCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InsuranceCompaniesCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InsuranceCompaniesCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InsuranceCompaniesCodesRoutingModule {
}
