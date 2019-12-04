import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ElectricalConnectionsToTheBuildingGuard } from './shared/electrical-connections-to-the-building.guard';
import { ElectricalConnectionsToTheBuildingNewComponent } from './electrical-connections-to-the-building-new/electrical-connections-to-the-building-new.component';
import { ElectricalConnectionsToTheBuildingEditComponent } from './electrical-connections-to-the-building-edit/electrical-connections-to-the-building-edit.component';
import { ElectricalConnectionsToTheBuildingListComponent } from './electrical-connections-to-the-building-list/electrical-connections-to-the-building-list.component';
import { ElectricalConnectionsToTheBuildingViewComponent } from './electrical-connections-to-the-building-view/electrical-connections-to-the-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: ElectricalConnectionsToTheBuildingListComponent,
    canActivate: [ElectricalConnectionsToTheBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ElectricalConnectionsToTheBuildingNewComponent,
    canActivate: [ElectricalConnectionsToTheBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ElectricalConnectionsToTheBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ElectricalConnectionsToTheBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ElectricalConnectionsToTheBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ElectricalConnectionsToTheBuildingRoutingModule {
}
