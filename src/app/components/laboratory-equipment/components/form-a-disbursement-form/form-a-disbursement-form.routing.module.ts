import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormADisbursementFormGuard } from './shared/form-a-disbursement-form.guard';
import { FormADisbursementFormNewComponent } from './form-a-disbursement-form-new/form-a-disbursement-form-new.component';
import { FormADisbursementFormEditComponent } from './form-a-disbursement-form-edit/form-a-disbursement-form-edit.component';
import { FormADisbursementFormListComponent } from './form-a-disbursement-form-list/form-a-disbursement-form-list.component';
import { FormADisbursementFormViewComponent } from './form-a-disbursement-form-view/form-a-disbursement-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: FormADisbursementFormListComponent,
    canActivate: [FormADisbursementFormGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FormADisbursementFormNewComponent,
    canActivate: [FormADisbursementFormGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FormADisbursementFormEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FormADisbursementFormListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FormADisbursementFormViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FormADisbursementFormRoutingModule {
}
