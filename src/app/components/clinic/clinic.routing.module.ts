
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';


const routes: Routes = [
  {
    path: '',
    component: ClinicComponent,
  },

  {
    path: 'period-of-work-for-the-clinic', loadChildren: './components/period-of-work-for-the-clinic/period-of-work-for-the-clinic.module#PeriodOfWorkForTheClinicModule',
    data: {
      moduleName: 'PeriodOfWorkForTheClinic'
    },
  },

  {
    path: 'medical-examination-form', loadChildren: './components/medical-examination-form/medical-examination-form.module#MedicalExaminationFormModule',
    data: {
      moduleName: 'MedicalExaminationForm'
    },
  },

  {
    path: 'dispensing-the-patients-medicine', loadChildren: './components/dispensing-the-patients-medicine/dispensing-the-patients-medicine.module#DispensingThePatientsMedicineModule',
    data: {
      moduleName: 'DispensingThePatientsMedicine'
    },
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ClinicRoutingModule {
}

