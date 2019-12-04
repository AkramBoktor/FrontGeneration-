import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IdentificationDataForAnAdministrativeBuildingGuard } from './shared/identification-data-for-an-administrative-building.guard';
import { IdentificationDataForAnAdministrativeBuildingNewComponent } from './identification-data-for-an-administrative-building-new/identification-data-for-an-administrative-building-new.component';
import { IdentificationDataForAnAdministrativeBuildingEditComponent } from './identification-data-for-an-administrative-building-edit/identification-data-for-an-administrative-building-edit.component';
import { IdentificationDataForAnAdministrativeBuildingListComponent } from './identification-data-for-an-administrative-building-list/identification-data-for-an-administrative-building-list.component';
import { IdentificationDataForAnAdministrativeBuildingViewComponent } from './identification-data-for-an-administrative-building-view/identification-data-for-an-administrative-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: IdentificationDataForAnAdministrativeBuildingListComponent,
    canActivate: [IdentificationDataForAnAdministrativeBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IdentificationDataForAnAdministrativeBuildingNewComponent,
    canActivate: [IdentificationDataForAnAdministrativeBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IdentificationDataForAnAdministrativeBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IdentificationDataForAnAdministrativeBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IdentificationDataForAnAdministrativeBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IdentificationDataForAnAdministrativeBuildingRoutingModule {
}
