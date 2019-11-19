import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DispensingThePatientsMedicineGuard } from './shared/dispensing-the-patients-medicine.guard';
import { DispensingThePatientsMedicineNewComponent } from './dispensing-the-patients-medicine-new/dispensing-the-patients-medicine-new.component';
import { DispensingThePatientsMedicineEditComponent } from './dispensing-the-patients-medicine-edit/dispensing-the-patients-medicine-edit.component';
import { DispensingThePatientsMedicineListComponent } from './dispensing-the-patients-medicine-list/dispensing-the-patients-medicine-list.component';
import { DispensingThePatientsMedicineViewComponent } from './dispensing-the-patients-medicine-view/dispensing-the-patients-medicine-view.component';

const routes: Routes = [
  {
    path: '',
    component: DispensingThePatientsMedicineListComponent,
    canActivate: [DispensingThePatientsMedicineGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DispensingThePatientsMedicineNewComponent,
    canActivate: [DispensingThePatientsMedicineGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DispensingThePatientsMedicineEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DispensingThePatientsMedicineListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DispensingThePatientsMedicineViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DispensingThePatientsMedicineRoutingModule {
}
