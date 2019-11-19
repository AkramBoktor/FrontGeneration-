import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExtensionInsurancePolicyDataGuard } from './shared/extension-insurance-policy-data.guard';
import { ExtensionInsurancePolicyDataNewComponent } from './extension-insurance-policy-data-new/extension-insurance-policy-data-new.component';
import { ExtensionInsurancePolicyDataEditComponent } from './extension-insurance-policy-data-edit/extension-insurance-policy-data-edit.component';
import { ExtensionInsurancePolicyDataListComponent } from './extension-insurance-policy-data-list/extension-insurance-policy-data-list.component';
import { ExtensionInsurancePolicyDataViewComponent } from './extension-insurance-policy-data-view/extension-insurance-policy-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExtensionInsurancePolicyDataListComponent,
    canActivate: [ExtensionInsurancePolicyDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExtensionInsurancePolicyDataNewComponent,
    canActivate: [ExtensionInsurancePolicyDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExtensionInsurancePolicyDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExtensionInsurancePolicyDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExtensionInsurancePolicyDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExtensionInsurancePolicyDataRoutingModule {
}
