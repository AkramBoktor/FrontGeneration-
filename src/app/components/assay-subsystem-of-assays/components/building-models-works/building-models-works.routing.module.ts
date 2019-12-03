import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BuildingModelsWorksGuard } from './shared/building-models-works.guard';
import { BuildingModelsWorksNewComponent } from './building-models-works-new/building-models-works-new.component';
import { BuildingModelsWorksEditComponent } from './building-models-works-edit/building-models-works-edit.component';
import { BuildingModelsWorksListComponent } from './building-models-works-list/building-models-works-list.component';
import { BuildingModelsWorksViewComponent } from './building-models-works-view/building-models-works-view.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingModelsWorksListComponent,
    canActivate: [BuildingModelsWorksGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BuildingModelsWorksNewComponent,
    canActivate: [BuildingModelsWorksGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BuildingModelsWorksEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BuildingModelsWorksListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BuildingModelsWorksViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BuildingModelsWorksRoutingModule {
}
