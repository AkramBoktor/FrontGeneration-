import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BuildingDataGuard } from './shared/building-data.guard';
import { BuildingDataNewComponent } from './building-data-new/building-data-new.component';
import { BuildingDataEditComponent } from './building-data-edit/building-data-edit.component';
import { BuildingDataListComponent } from './building-data-list/building-data-list.component';
import { BuildingDataViewComponent } from './building-data-view/building-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingDataListComponent,
    canActivate: [BuildingDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BuildingDataNewComponent,
    canActivate: [BuildingDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BuildingDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BuildingDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BuildingDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BuildingDataRoutingModule {
}
