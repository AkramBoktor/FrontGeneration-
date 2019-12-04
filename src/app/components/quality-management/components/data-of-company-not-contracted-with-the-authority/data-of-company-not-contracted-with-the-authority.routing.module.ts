import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataOfCompanyNotContractedWithTheAuthorityGuard } from './shared/data-of-company-not-contracted-with-the-authority.guard';
import { DataOfCompanyNotContractedWithTheAuthorityNewComponent } from './data-of-company-not-contracted-with-the-authority-new/data-of-company-not-contracted-with-the-authority-new.component';
import { DataOfCompanyNotContractedWithTheAuthorityEditComponent } from './data-of-company-not-contracted-with-the-authority-edit/data-of-company-not-contracted-with-the-authority-edit.component';
import { DataOfCompanyNotContractedWithTheAuthorityListComponent } from './data-of-company-not-contracted-with-the-authority-list/data-of-company-not-contracted-with-the-authority-list.component';
import { DataOfCompanyNotContractedWithTheAuthorityViewComponent } from './data-of-company-not-contracted-with-the-authority-view/data-of-company-not-contracted-with-the-authority-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataOfCompanyNotContractedWithTheAuthorityListComponent,
    canActivate: [DataOfCompanyNotContractedWithTheAuthorityGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataOfCompanyNotContractedWithTheAuthorityNewComponent,
    canActivate: [DataOfCompanyNotContractedWithTheAuthorityGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataOfCompanyNotContractedWithTheAuthorityEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataOfCompanyNotContractedWithTheAuthorityListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataOfCompanyNotContractedWithTheAuthorityViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataOfCompanyNotContractedWithTheAuthorityRoutingModule {
}
