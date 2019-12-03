import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GeneralLocationOfAnAdministrativeBuildingGuard } from './shared/general-location-of-an-administrative-building.guard';
import { GeneralLocationOfAnAdministrativeBuildingNewComponent } from './general-location-of-an-administrative-building-new/general-location-of-an-administrative-building-new.component';
import { GeneralLocationOfAnAdministrativeBuildingEditComponent } from './general-location-of-an-administrative-building-edit/general-location-of-an-administrative-building-edit.component';
import { GeneralLocationOfAnAdministrativeBuildingListComponent } from './general-location-of-an-administrative-building-list/general-location-of-an-administrative-building-list.component';
import { GeneralLocationOfAnAdministrativeBuildingViewComponent } from './general-location-of-an-administrative-building-view/general-location-of-an-administrative-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralLocationOfAnAdministrativeBuildingListComponent,
    canActivate: [GeneralLocationOfAnAdministrativeBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GeneralLocationOfAnAdministrativeBuildingNewComponent,
    canActivate: [GeneralLocationOfAnAdministrativeBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GeneralLocationOfAnAdministrativeBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GeneralLocationOfAnAdministrativeBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GeneralLocationOfAnAdministrativeBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GeneralLocationOfAnAdministrativeBuildingRoutingModule {
}
