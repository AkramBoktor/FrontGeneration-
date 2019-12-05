import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalFormADisbursementFormGuard } from './shared/typical-form-a-disbursement-form.guard';
import { TypicalFormADisbursementFormNewComponent } from './typical-form-a-disbursement-form-new/typical-form-a-disbursement-form-new.component';
import { TypicalFormADisbursementFormEditComponent } from './typical-form-a-disbursement-form-edit/typical-form-a-disbursement-form-edit.component';
import { TypicalFormADisbursementFormListComponent } from './typical-form-a-disbursement-form-list/typical-form-a-disbursement-form-list.component';
import { TypicalFormADisbursementFormViewComponent } from './typical-form-a-disbursement-form-view/typical-form-a-disbursement-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalFormADisbursementFormListComponent,
    canActivate: [TypicalFormADisbursementFormGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalFormADisbursementFormNewComponent,
    canActivate: [TypicalFormADisbursementFormGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalFormADisbursementFormEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalFormADisbursementFormListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalFormADisbursementFormViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalFormADisbursementFormRoutingModule {
}
