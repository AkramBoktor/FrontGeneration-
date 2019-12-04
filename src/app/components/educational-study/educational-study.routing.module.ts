
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EducationalStudyComponent } from './educational-study.component';


const routes: Routes = [
  {
    path: '',
    component: EducationalStudyComponent,
  },
  {
    path: 'data-of-educational-study', loadChildren: './components/data-of-educational-study/data-of-educational-study.module#DataOfEducationalStudyModule',
    data: {
      moduleName: 'DataOfEducationalStudy'
    },
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

