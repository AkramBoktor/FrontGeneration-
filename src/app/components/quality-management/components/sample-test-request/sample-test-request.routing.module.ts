import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SampleTestRequestGuard } from './shared/sample-test-request.guard';
import { SampleTestRequestNewComponent } from './sample-test-request-new/sample-test-request-new.component';
import { SampleTestRequestEditComponent } from './sample-test-request-edit/sample-test-request-edit.component';
import { SampleTestRequestListComponent } from './sample-test-request-list/sample-test-request-list.component';
import { SampleTestRequestViewComponent } from './sample-test-request-view/sample-test-request-view.component';

const routes: Routes = [
  {
    path: '',
    component: SampleTestRequestListComponent,
    canActivate: [SampleTestRequestGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SampleTestRequestNewComponent,
    canActivate: [SampleTestRequestGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SampleTestRequestEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SampleTestRequestListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SampleTestRequestViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SampleTestRequestRoutingModule {
}
