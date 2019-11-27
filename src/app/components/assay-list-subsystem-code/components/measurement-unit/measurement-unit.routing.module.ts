import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MeasurementUnitGuard } from './shared/measurement-unit.guard';
import { MeasurementUnitNewComponent } from './measurement-unit-new/measurement-unit-new.component';
import { MeasurementUnitEditComponent } from './measurement-unit-edit/measurement-unit-edit.component';
import { MeasurementUnitListComponent } from './measurement-unit-list/measurement-unit-list.component';
import { MeasurementUnitViewComponent } from './measurement-unit-view/measurement-unit-view.component';

const routes: Routes = [
  {
    path: '',
    component: MeasurementUnitListComponent,
    canActivate: [MeasurementUnitGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MeasurementUnitNewComponent,
    canActivate: [MeasurementUnitGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MeasurementUnitEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MeasurementUnitListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MeasurementUnitViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MeasurementUnitRoutingModule {
}
