import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AdjustThePositionOfProjectsGuard } from './shared/adjust-the-position-of-projects.guard';
import { AdjustThePositionOfProjectsNewComponent } from './adjust-the-position-of-projects-new/adjust-the-position-of-projects-new.component';
import { AdjustThePositionOfProjectsEditComponent } from './adjust-the-position-of-projects-edit/adjust-the-position-of-projects-edit.component';
import { AdjustThePositionOfProjectsListComponent } from './adjust-the-position-of-projects-list/adjust-the-position-of-projects-list.component';
import { AdjustThePositionOfProjectsViewComponent } from './adjust-the-position-of-projects-view/adjust-the-position-of-projects-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdjustThePositionOfProjectsListComponent,
    canActivate: [AdjustThePositionOfProjectsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AdjustThePositionOfProjectsNewComponent,
    canActivate: [AdjustThePositionOfProjectsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AdjustThePositionOfProjectsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AdjustThePositionOfProjectsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AdjustThePositionOfProjectsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AdjustThePositionOfProjectsRoutingModule {
}
