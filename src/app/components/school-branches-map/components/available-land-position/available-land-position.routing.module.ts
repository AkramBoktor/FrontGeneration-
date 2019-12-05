import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AvailableLandPositionGuard } from './shared/available-land-position.guard';
import { AvailableLandPositionNewComponent } from './available-land-position-new/available-land-position-new.component';
import { AvailableLandPositionEditComponent } from './available-land-position-edit/available-land-position-edit.component';
import { AvailableLandPositionListComponent } from './available-land-position-list/available-land-position-list.component';
import { AvailableLandPositionViewComponent } from './available-land-position-view/available-land-position-view.component';

const routes: Routes = [
  {
    path: '',
    component: AvailableLandPositionListComponent,
    canActivate: [AvailableLandPositionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AvailableLandPositionNewComponent,
    canActivate: [AvailableLandPositionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AvailableLandPositionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AvailableLandPositionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AvailableLandPositionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AvailableLandPositionRoutingModule {
}
