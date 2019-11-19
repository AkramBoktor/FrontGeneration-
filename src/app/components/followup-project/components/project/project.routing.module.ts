import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProjectGuard } from './shared/project.guard';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    canActivate: [ProjectGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ProjectNewComponent,
    canActivate: [ProjectGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ProjectEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ProjectListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ProjectViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProjectRoutingModule {
}
