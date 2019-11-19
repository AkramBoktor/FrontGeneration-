
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayBuildingWeightFactorListComponent } from './assay-building-weight-factor-list.component';


const routes: Routes = [
  {
    path: '',
    component: AssayBuildingWeightFactorListComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayBuildingWeightFactorListRoutingModule {
}

