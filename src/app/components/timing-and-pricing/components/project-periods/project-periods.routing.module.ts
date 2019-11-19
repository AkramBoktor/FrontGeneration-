import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProjectPeriodsGuard } from './shared/project-periods.guard';
import { ProjectPeriodsNewComponent } from './project-periods-new/project-periods-new.component';
import { ProjectPeriodsEditComponent } from './project-periods-edit/project-periods-edit.component';
import { ProjectPeriodsListComponent } from './project-periods-list/project-periods-list.component';
import { ProjectPeriodsViewComponent } from './project-periods-view/project-periods-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectPeriodsListComponent,
    canActivate: [ProjectPeriodsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ProjectPeriodsNewComponent,
    canActivate: [ProjectPeriodsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ProjectPeriodsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ProjectPeriodsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ProjectPeriodsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProjectPeriodsRoutingModule {
}
