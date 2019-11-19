import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HolderOfCourseGuard } from './shared/holder-of-course.guard';
import { HolderOfCourseNewComponent } from './holder-of-course-new/holder-of-course-new.component';
import { HolderOfCourseEditComponent } from './holder-of-course-edit/holder-of-course-edit.component';
import { HolderOfCourseListComponent } from './holder-of-course-list/holder-of-course-list.component';
import { HolderOfCourseViewComponent } from './holder-of-course-view/holder-of-course-view.component';

const routes: Routes = [
  {
    path: '',
    component: HolderOfCourseListComponent,
    canActivate: [HolderOfCourseGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: HolderOfCourseNewComponent,
    canActivate: [HolderOfCourseGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: HolderOfCourseEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: HolderOfCourseListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: HolderOfCourseViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class HolderOfCourseRoutingModule {
}
