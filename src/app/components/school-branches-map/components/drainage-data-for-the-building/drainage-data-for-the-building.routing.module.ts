import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DrainageDataForTheBuildingGuard } from './shared/drainage-data-for-the-building.guard';
import { DrainageDataForTheBuildingNewComponent } from './drainage-data-for-the-building-new/drainage-data-for-the-building-new.component';
import { DrainageDataForTheBuildingEditComponent } from './drainage-data-for-the-building-edit/drainage-data-for-the-building-edit.component';
import { DrainageDataForTheBuildingListComponent } from './drainage-data-for-the-building-list/drainage-data-for-the-building-list.component';
import { DrainageDataForTheBuildingViewComponent } from './drainage-data-for-the-building-view/drainage-data-for-the-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: DrainageDataForTheBuildingListComponent,
    canActivate: [DrainageDataForTheBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DrainageDataForTheBuildingNewComponent,
    canActivate: [DrainageDataForTheBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DrainageDataForTheBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DrainageDataForTheBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DrainageDataForTheBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DrainageDataForTheBuildingRoutingModule {
}
