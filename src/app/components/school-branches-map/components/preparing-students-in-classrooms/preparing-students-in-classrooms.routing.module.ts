import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PreparingStudentsInClassroomsGuard } from './shared/preparing-students-in-classrooms.guard';
import { PreparingStudentsInClassroomsNewComponent } from './preparing-students-in-classrooms-new/preparing-students-in-classrooms-new.component';
import { PreparingStudentsInClassroomsEditComponent } from './preparing-students-in-classrooms-edit/preparing-students-in-classrooms-edit.component';
import { PreparingStudentsInClassroomsListComponent } from './preparing-students-in-classrooms-list/preparing-students-in-classrooms-list.component';
import { PreparingStudentsInClassroomsViewComponent } from './preparing-students-in-classrooms-view/preparing-students-in-classrooms-view.component';

const routes: Routes = [
  {
    path: '',
    component: PreparingStudentsInClassroomsListComponent,
    canActivate: [PreparingStudentsInClassroomsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PreparingStudentsInClassroomsNewComponent,
    canActivate: [PreparingStudentsInClassroomsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PreparingStudentsInClassroomsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PreparingStudentsInClassroomsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PreparingStudentsInClassroomsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PreparingStudentsInClassroomsRoutingModule {
}
