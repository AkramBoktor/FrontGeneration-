import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { JobDataGuard } from './shared/job-data.guard';
import { JobDataNewComponent } from './job-data-new/job-data-new.component';
import { JobDataEditComponent } from './job-data-edit/job-data-edit.component';
import { JobDataListComponent } from './job-data-list/job-data-list.component';
import { JobDataViewComponent } from './job-data-view/job-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: JobDataListComponent,
    canActivate: [JobDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: JobDataNewComponent,
    canActivate: [JobDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: JobDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: JobDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: JobDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class JobDataRoutingModule {
}
