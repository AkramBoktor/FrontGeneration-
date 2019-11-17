
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PharmacyComponent } from './pharmacy.component';


const routes: Routes = [
  {
    path: '',
    component: PharmacyComponent,
  },
  
  
{
    path: 'dispensing-medication-to-a-patient', loadChildren: './components/dispensing-medication-to-a-patient/dispensing-medication-to-a-patient.module#DispensingMedicationToAPatientModule',
    data: {
      moduleName: 'DispensingMedicationToAPatient'
    },
},

{
    path: 'drugs-information', loadChildren: './components/drugs-information/drugs-information.module#DrugsInformationModule',
    data: {
      moduleName: 'DrugsInformation '
    },
},

{
    path: 'period-of-work-for-the-pharmacy', loadChildren: './components/period-of-work-for-the-pharmacy/period-of-work-for-the-pharmacy.module#PeriodOfWorkForThePharmacyModule',
    data: {
      moduleName: 'PeriodOfWorkForThePharmacy'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PharmacyRoutingModule {
}

