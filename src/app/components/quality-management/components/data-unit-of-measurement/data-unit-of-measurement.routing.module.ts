import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataUnitOfMeasurementGuard } from './shared/data-unit-of-measurement.guard';
import { DataUnitOfMeasurementNewComponent } from './data-unit-of-measurement-new/data-unit-of-measurement-new.component';
import { DataUnitOfMeasurementEditComponent } from './data-unit-of-measurement-edit/data-unit-of-measurement-edit.component';
import { DataUnitOfMeasurementListComponent } from './data-unit-of-measurement-list/data-unit-of-measurement-list.component';
import { DataUnitOfMeasurementViewComponent } from './data-unit-of-measurement-view/data-unit-of-measurement-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataUnitOfMeasurementListComponent,
    canActivate: [DataUnitOfMeasurementGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataUnitOfMeasurementNewComponent,
    canActivate: [DataUnitOfMeasurementGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataUnitOfMeasurementEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataUnitOfMeasurementListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataUnitOfMeasurementViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataUnitOfMeasurementRoutingModule {
}
