import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HealthUnitDataGuard } from './shared/health-unit-data.guard';
import { HealthUnitDataNewComponent } from './health-unit-data-new/health-unit-data-new.component';
import { HealthUnitDataEditComponent } from './health-unit-data-edit/health-unit-data-edit.component';
import { HealthUnitDataListComponent } from './health-unit-data-list/health-unit-data-list.component';
import { HealthUnitDataViewComponent } from './health-unit-data-view/health-unit-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: HealthUnitDataListComponent,
    canActivate: [HealthUnitDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: HealthUnitDataNewComponent,
    canActivate: [HealthUnitDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: HealthUnitDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: HealthUnitDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: HealthUnitDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class HealthUnitDataRoutingModule {
}
