import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CalibrationUnitDataGuard } from './shared/calibration-unit-data.guard';
import { CalibrationUnitDataNewComponent } from './calibration-unit-data-new/calibration-unit-data-new.component';
import { CalibrationUnitDataEditComponent } from './calibration-unit-data-edit/calibration-unit-data-edit.component';
import { CalibrationUnitDataListComponent } from './calibration-unit-data-list/calibration-unit-data-list.component';
import { CalibrationUnitDataViewComponent } from './calibration-unit-data-view/calibration-unit-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: CalibrationUnitDataListComponent,
    canActivate: [CalibrationUnitDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CalibrationUnitDataNewComponent,
    canActivate: [CalibrationUnitDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CalibrationUnitDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CalibrationUnitDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CalibrationUnitDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CalibrationUnitDataRoutingModule {
}
