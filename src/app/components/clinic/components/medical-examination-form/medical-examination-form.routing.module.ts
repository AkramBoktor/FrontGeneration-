import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MedicalExaminationFormGuard } from './shared/medical-examination-form.guard';
import { MedicalExaminationFormNewComponent } from './medical-examination-form-new/medical-examination-form-new.component';
import { MedicalExaminationFormEditComponent } from './medical-examination-form-edit/medical-examination-form-edit.component';
import { MedicalExaminationFormListComponent } from './medical-examination-form-list/medical-examination-form-list.component';
import { MedicalExaminationFormViewComponent } from './medical-examination-form-view/medical-examination-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: MedicalExaminationFormListComponent,
    canActivate: [MedicalExaminationFormGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MedicalExaminationFormNewComponent,
    canActivate: [MedicalExaminationFormGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MedicalExaminationFormEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MedicalExaminationFormListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MedicalExaminationFormViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MedicalExaminationFormRoutingModule {
}
