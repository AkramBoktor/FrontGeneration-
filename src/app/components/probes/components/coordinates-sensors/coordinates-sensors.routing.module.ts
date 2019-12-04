import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CoordinatesSensorsGuard } from './shared/coordinates-sensors.guard';
import { CoordinatesSensorsNewComponent } from './coordinates-sensors-new/coordinates-sensors-new.component';
import { CoordinatesSensorsEditComponent } from './coordinates-sensors-edit/coordinates-sensors-edit.component';
import { CoordinatesSensorsListComponent } from './coordinates-sensors-list/coordinates-sensors-list.component';
import { CoordinatesSensorsViewComponent } from './coordinates-sensors-view/coordinates-sensors-view.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinatesSensorsListComponent,
    canActivate: [CoordinatesSensorsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CoordinatesSensorsNewComponent,
    canActivate: [CoordinatesSensorsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CoordinatesSensorsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CoordinatesSensorsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CoordinatesSensorsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CoordinatesSensorsRoutingModule {
}
