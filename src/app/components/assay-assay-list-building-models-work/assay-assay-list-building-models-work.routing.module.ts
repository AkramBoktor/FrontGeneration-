
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListBuildingModelsWorkComponent } from './assay-assay-list-building-models-work.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListBuildingModelsWorkComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListBuildingModelsWorkRoutingModule {
}

