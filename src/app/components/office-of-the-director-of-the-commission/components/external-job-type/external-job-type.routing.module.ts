import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExternalJobTypeGuard } from './shared/external-job-type.guard';
import { ExternalJobTypeNewComponent } from './external-job-type-new/external-job-type-new.component';
import { ExternalJobTypeEditComponent } from './external-job-type-edit/external-job-type-edit.component';
import { ExternalJobTypeListComponent } from './external-job-type-list/external-job-type-list.component';
import { ExternalJobTypeViewComponent } from './external-job-type-view/external-job-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalJobTypeListComponent,
    canActivate: [ExternalJobTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExternalJobTypeNewComponent,
    canActivate: [ExternalJobTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExternalJobTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExternalJobTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExternalJobTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExternalJobTypeRoutingModule {
}
