
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EducationalStudyComponent } from './educational-study.component';


const routes: Routes = [
  {
    path: '',
    component: EducationalStudyComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EducationalStudyRoutingModule {
}

