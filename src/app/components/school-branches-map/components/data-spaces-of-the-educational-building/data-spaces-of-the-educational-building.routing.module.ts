import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataSpacesOfTheEducationalBuildingGuard } from './shared/data-spaces-of-the-educational-building.guard';
import { DataSpacesOfTheEducationalBuildingNewComponent } from './data-spaces-of-the-educational-building-new/data-spaces-of-the-educational-building-new.component';
import { DataSpacesOfTheEducationalBuildingEditComponent } from './data-spaces-of-the-educational-building-edit/data-spaces-of-the-educational-building-edit.component';
import { DataSpacesOfTheEducationalBuildingListComponent } from './data-spaces-of-the-educational-building-list/data-spaces-of-the-educational-building-list.component';
import { DataSpacesOfTheEducationalBuildingViewComponent } from './data-spaces-of-the-educational-building-view/data-spaces-of-the-educational-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataSpacesOfTheEducationalBuildingListComponent,
    canActivate: [DataSpacesOfTheEducationalBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataSpacesOfTheEducationalBuildingNewComponent,
    canActivate: [DataSpacesOfTheEducationalBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataSpacesOfTheEducationalBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataSpacesOfTheEducationalBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataSpacesOfTheEducationalBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataSpacesOfTheEducationalBuildingRoutingModule {
}
