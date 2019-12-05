import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ElectronicPaymentFormGuard } from './shared/electronic-payment-form.guard';
import { ElectronicPaymentFormNewComponent } from './electronic-payment-form-new/electronic-payment-form-new.component';
import { ElectronicPaymentFormEditComponent } from './electronic-payment-form-edit/electronic-payment-form-edit.component';
import { ElectronicPaymentFormListComponent } from './electronic-payment-form-list/electronic-payment-form-list.component';
import { ElectronicPaymentFormViewComponent } from './electronic-payment-form-view/electronic-payment-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronicPaymentFormListComponent,
    canActivate: [ElectronicPaymentFormGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ElectronicPaymentFormNewComponent,
    canActivate: [ElectronicPaymentFormGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ElectronicPaymentFormEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ElectronicPaymentFormListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ElectronicPaymentFormViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ElectronicPaymentFormRoutingModule {
}
