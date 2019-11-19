
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BuildingInspectionAndValidityCertificateComponent } from './building-inspection-and-validity-certificate.component';


const routes: Routes = [
  {
    path: '',
    component: BuildingInspectionAndValidityCertificateComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BuildingInspectionAndValidityCertificateRoutingModule {
}

