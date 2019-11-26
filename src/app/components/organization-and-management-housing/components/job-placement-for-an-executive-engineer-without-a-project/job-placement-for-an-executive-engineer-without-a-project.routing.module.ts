import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectGuard } from './shared/job-placement-for-an-executive-engineer-without-a-project.guard';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent } from './job-placement-for-an-executive-engineer-without-a-project-new/job-placement-for-an-executive-engineer-without-a-project-new.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent } from './job-placement-for-an-executive-engineer-without-a-project-edit/job-placement-for-an-executive-engineer-without-a-project-edit.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectListComponent } from './job-placement-for-an-executive-engineer-without-a-project-list/job-placement-for-an-executive-engineer-without-a-project-list.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent } from './job-placement-for-an-executive-engineer-without-a-project-view/job-placement-for-an-executive-engineer-without-a-project-view.component';

const routes: Routes = [
  {
    path: '',
    component: JobPlacementForAnExecutiveEngineerWithoutAProjectListComponent,
    canActivate: [JobPlacementForAnExecutiveEngineerWithoutAProjectGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent,
    canActivate: [JobPlacementForAnExecutiveEngineerWithoutAProjectGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: JobPlacementForAnExecutiveEngineerWithoutAProjectListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class JobPlacementForAnExecutiveEngineerWithoutAProjectRoutingModule {
}
