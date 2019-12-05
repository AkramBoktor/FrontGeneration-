import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ThePositionsOfLandAvailableGuard } from './shared/the-positions-of-land-available.guard';
import { ThePositionsOfLandAvailableNewComponent } from './the-positions-of-land-available-new/the-positions-of-land-available-new.component';
import { ThePositionsOfLandAvailableEditComponent } from './the-positions-of-land-available-edit/the-positions-of-land-available-edit.component';
import { ThePositionsOfLandAvailableListComponent } from './the-positions-of-land-available-list/the-positions-of-land-available-list.component';
import { ThePositionsOfLandAvailableViewComponent } from './the-positions-of-land-available-view/the-positions-of-land-available-view.component';

const routes: Routes = [
  {
    path: '',
    component: ThePositionsOfLandAvailableListComponent,
    canActivate: [ThePositionsOfLandAvailableGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ThePositionsOfLandAvailableNewComponent,
    canActivate: [ThePositionsOfLandAvailableGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ThePositionsOfLandAvailableEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ThePositionsOfLandAvailableListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ThePositionsOfLandAvailableViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ThePositionsOfLandAvailableRoutingModule {
}
