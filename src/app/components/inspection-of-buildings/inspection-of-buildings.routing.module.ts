
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InspectionOfBuildingsComponent } from './inspection-of-buildings.component';


const routes: Routes = [
  {
    path: '',
    component: InspectionOfBuildingsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InspectionOfBuildingsRoutingModule {
}

