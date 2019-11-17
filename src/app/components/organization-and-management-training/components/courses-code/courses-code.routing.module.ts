import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CoursesCodeGuard } from './shared/courses-code.guard';
import { CoursesCodeNewComponent } from './courses-code-new/courses-code-new.component';
import { CoursesCodeEditComponent } from './courses-code-edit/courses-code-edit.component';
import { CoursesCodeListComponent } from './courses-code-list/courses-code-list.component';
import { CoursesCodeViewComponent } from './courses-code-view/courses-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesCodeListComponent,
    canActivate: [CoursesCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CoursesCodeNewComponent,
    canActivate: [CoursesCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CoursesCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CoursesCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CoursesCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CoursesCodeRoutingModule {
}
