import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DispensingMedicationToAPatientGuard } from './shared/dispensing-medication-to-a-patient.guard';
import { DispensingMedicationToAPatientNewComponent } from './dispensing-medication-to-a-patient-new/dispensing-medication-to-a-patient-new.component';
import { DispensingMedicationToAPatientEditComponent } from './dispensing-medication-to-a-patient-edit/dispensing-medication-to-a-patient-edit.component';
import { DispensingMedicationToAPatientListComponent } from './dispensing-medication-to-a-patient-list/dispensing-medication-to-a-patient-list.component';
import { DispensingMedicationToAPatientViewComponent } from './dispensing-medication-to-a-patient-view/dispensing-medication-to-a-patient-view.component';

const routes: Routes = [
  {
    path: '',
    component: DispensingMedicationToAPatientListComponent,
    canActivate: [DispensingMedicationToAPatientGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DispensingMedicationToAPatientNewComponent,
    canActivate: [DispensingMedicationToAPatientGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DispensingMedicationToAPatientEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DispensingMedicationToAPatientListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DispensingMedicationToAPatientViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DispensingMedicationToAPatientRoutingModule {
}
