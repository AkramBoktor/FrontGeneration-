import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataOfCompanyContractedWithTheAuthorityGuard } from './shared/data-of-company-contracted-with-the-authority.guard';
import { DataOfCompanyContractedWithTheAuthorityNewComponent } from './data-of-company-contracted-with-the-authority-new/data-of-company-contracted-with-the-authority-new.component';
import { DataOfCompanyContractedWithTheAuthorityEditComponent } from './data-of-company-contracted-with-the-authority-edit/data-of-company-contracted-with-the-authority-edit.component';
import { DataOfCompanyContractedWithTheAuthorityListComponent } from './data-of-company-contracted-with-the-authority-list/data-of-company-contracted-with-the-authority-list.component';
import { DataOfCompanyContractedWithTheAuthorityViewComponent } from './data-of-company-contracted-with-the-authority-view/data-of-company-contracted-with-the-authority-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataOfCompanyContractedWithTheAuthorityListComponent,
    canActivate: [DataOfCompanyContractedWithTheAuthorityGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataOfCompanyContractedWithTheAuthorityNewComponent,
    canActivate: [DataOfCompanyContractedWithTheAuthorityGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataOfCompanyContractedWithTheAuthorityEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataOfCompanyContractedWithTheAuthorityListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataOfCompanyContractedWithTheAuthorityViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataOfCompanyContractedWithTheAuthorityRoutingModule {
}
