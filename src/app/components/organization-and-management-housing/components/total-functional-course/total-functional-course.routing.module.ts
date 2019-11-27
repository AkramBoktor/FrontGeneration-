import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TotalFunctionalCourseGuard } from './shared/total-functional-course.guard';
import { TotalFunctionalCourseNewComponent } from './total-functional-course-new/total-functional-course-new.component';
import { TotalFunctionalCourseEditComponent } from './total-functional-course-edit/total-functional-course-edit.component';
import { TotalFunctionalCourseListComponent } from './total-functional-course-list/total-functional-course-list.component';
import { TotalFunctionalCourseViewComponent } from './total-functional-course-view/total-functional-course-view.component';

const routes: Routes = [
  {
    path: '',
    component: TotalFunctionalCourseListComponent,
    canActivate: [TotalFunctionalCourseGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TotalFunctionalCourseNewComponent,
    canActivate: [TotalFunctionalCourseGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TotalFunctionalCourseEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TotalFunctionalCourseListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TotalFunctionalCourseViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TotalFunctionalCourseRoutingModule {
}
