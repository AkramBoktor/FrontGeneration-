import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProjectDataGuard } from './shared/project-data.guard';
import { ProjectDataNewComponent } from './project-data-new/project-data-new.component';
import { ProjectDataEditComponent } from './project-data-edit/project-data-edit.component';
import { ProjectDataListComponent } from './project-data-list/project-data-list.component';
import { ProjectDataViewComponent } from './project-data-view/project-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectDataListComponent,
    canActivate: [ProjectDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ProjectDataNewComponent,
    canActivate: [ProjectDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ProjectDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ProjectDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ProjectDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProjectDataRoutingModule {
}
