import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RemovalRestorationDataOfClosedBuildingsGuard } from './shared/removal-restoration-data-of-closed-buildings.guard';
import { RemovalRestorationDataOfClosedBuildingsNewComponent } from './removal-restoration-data-of-closed-buildings-new/removal-restoration-data-of-closed-buildings-new.component';
import { RemovalRestorationDataOfClosedBuildingsEditComponent } from './removal-restoration-data-of-closed-buildings-edit/removal-restoration-data-of-closed-buildings-edit.component';
import { RemovalRestorationDataOfClosedBuildingsListComponent } from './removal-restoration-data-of-closed-buildings-list/removal-restoration-data-of-closed-buildings-list.component';
import { RemovalRestorationDataOfClosedBuildingsViewComponent } from './removal-restoration-data-of-closed-buildings-view/removal-restoration-data-of-closed-buildings-view.component';

const routes: Routes = [
  {
    path: '',
    component: RemovalRestorationDataOfClosedBuildingsListComponent,
    canActivate: [RemovalRestorationDataOfClosedBuildingsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RemovalRestorationDataOfClosedBuildingsNewComponent,
    canActivate: [RemovalRestorationDataOfClosedBuildingsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RemovalRestorationDataOfClosedBuildingsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RemovalRestorationDataOfClosedBuildingsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RemovalRestorationDataOfClosedBuildingsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RemovalRestorationDataOfClosedBuildingsRoutingModule {
}
