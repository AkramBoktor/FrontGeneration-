import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InsurancePolicyDataGuard } from './shared/insurance-policy-data.guard';
import { InsurancePolicyDataNewComponent } from './insurance-policy-data-new/insurance-policy-data-new.component';
import { InsurancePolicyDataEditComponent } from './insurance-policy-data-edit/insurance-policy-data-edit.component';
import { InsurancePolicyDataListComponent } from './insurance-policy-data-list/insurance-policy-data-list.component';
import { InsurancePolicyDataViewComponent } from './insurance-policy-data-view/insurance-policy-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: InsurancePolicyDataListComponent,
    canActivate: [InsurancePolicyDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InsurancePolicyDataNewComponent,
    canActivate: [InsurancePolicyDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InsurancePolicyDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InsurancePolicyDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InsurancePolicyDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InsurancePolicyDataRoutingModule {
}
