import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EducationalBuildingDataGuard } from './shared/educational-building-data.guard';
import { EducationalBuildingDataNewComponent } from './educational-building-data-new/educational-building-data-new.component';
import { EducationalBuildingDataEditComponent } from './educational-building-data-edit/educational-building-data-edit.component';
import { EducationalBuildingDataListComponent } from './educational-building-data-list/educational-building-data-list.component';
import { EducationalBuildingDataViewComponent } from './educational-building-data-view/educational-building-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: EducationalBuildingDataListComponent,
    canActivate: [EducationalBuildingDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EducationalBuildingDataNewComponent,
    canActivate: [EducationalBuildingDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EducationalBuildingDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EducationalBuildingDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EducationalBuildingDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EducationalBuildingDataRoutingModule {
}
