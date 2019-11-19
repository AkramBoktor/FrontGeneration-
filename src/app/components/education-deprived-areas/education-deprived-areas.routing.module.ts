
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EducationDeprivedAreasComponent } from './education-deprived-areas.component';


const routes: Routes = [
  {
    path: '',
    component: EducationDeprivedAreasComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EducationDeprivedAreasRoutingModule {
}

