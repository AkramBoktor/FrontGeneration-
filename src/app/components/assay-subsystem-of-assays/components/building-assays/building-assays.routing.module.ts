import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BuildingAssaysGuard } from './shared/building-assays.guard';
import { BuildingAssaysNewComponent } from './building-assays-new/building-assays-new.component';
import { BuildingAssaysEditComponent } from './building-assays-edit/building-assays-edit.component';
import { BuildingAssaysListComponent } from './building-assays-list/building-assays-list.component';
import { BuildingAssaysViewComponent } from './building-assays-view/building-assays-view.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingAssaysListComponent,
    canActivate: [BuildingAssaysGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BuildingAssaysNewComponent,
    canActivate: [BuildingAssaysGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BuildingAssaysEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BuildingAssaysListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BuildingAssaysViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BuildingAssaysRoutingModule {
}
