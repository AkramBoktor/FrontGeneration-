import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { StatementsOfSensorsGuard } from './shared/statements-of-sensors.guard';
import { StatementsOfSensorsNewComponent } from './statements-of-sensors-new/statements-of-sensors-new.component';
import { StatementsOfSensorsEditComponent } from './statements-of-sensors-edit/statements-of-sensors-edit.component';
import { StatementsOfSensorsListComponent } from './statements-of-sensors-list/statements-of-sensors-list.component';
import { StatementsOfSensorsViewComponent } from './statements-of-sensors-view/statements-of-sensors-view.component';

const routes: Routes = [
  {
    path: '',
    component: StatementsOfSensorsListComponent,
    canActivate: [StatementsOfSensorsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: StatementsOfSensorsNewComponent,
    canActivate: [StatementsOfSensorsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: StatementsOfSensorsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: StatementsOfSensorsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: StatementsOfSensorsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class StatementsOfSensorsRoutingModule {
}
