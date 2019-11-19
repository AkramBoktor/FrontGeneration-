
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ClassroomRequirementsComponent } from './classroom-requirements.component';


const routes: Routes = [
  {
    path: '',
    component: ClassroomRequirementsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ClassroomRequirementsRoutingModule {
}

