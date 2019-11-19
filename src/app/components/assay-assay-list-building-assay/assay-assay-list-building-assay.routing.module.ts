
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListBuildingAssayComponent } from './assay-assay-list-building-assay.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListBuildingAssayComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListBuildingAssayRoutingModule {
}

