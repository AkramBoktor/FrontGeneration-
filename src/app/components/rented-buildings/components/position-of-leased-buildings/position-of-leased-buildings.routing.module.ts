import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PositionOfLeasedBuildingsGuard } from './shared/position-of-leased-buildings.guard';
import { PositionOfLeasedBuildingsNewComponent } from './position-of-leased-buildings-new/position-of-leased-buildings-new.component';
import { PositionOfLeasedBuildingsEditComponent } from './position-of-leased-buildings-edit/position-of-leased-buildings-edit.component';
import { PositionOfLeasedBuildingsListComponent } from './position-of-leased-buildings-list/position-of-leased-buildings-list.component';
import { PositionOfLeasedBuildingsViewComponent } from './position-of-leased-buildings-view/position-of-leased-buildings-view.component';

const routes: Routes = [
  {
    path: '',
    component: PositionOfLeasedBuildingsListComponent,
    canActivate: [PositionOfLeasedBuildingsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PositionOfLeasedBuildingsNewComponent,
    canActivate: [PositionOfLeasedBuildingsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PositionOfLeasedBuildingsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PositionOfLeasedBuildingsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PositionOfLeasedBuildingsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PositionOfLeasedBuildingsRoutingModule {
}
