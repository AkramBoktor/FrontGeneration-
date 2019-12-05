import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SampleTestRequestForTheWorkOfOthersGuard } from './shared/sample-test-request-for-the-work-of-others.guard';
import { SampleTestRequestForTheWorkOfOthersNewComponent } from './sample-test-request-for-the-work-of-others-new/sample-test-request-for-the-work-of-others-new.component';
import { SampleTestRequestForTheWorkOfOthersEditComponent } from './sample-test-request-for-the-work-of-others-edit/sample-test-request-for-the-work-of-others-edit.component';
import { SampleTestRequestForTheWorkOfOthersListComponent } from './sample-test-request-for-the-work-of-others-list/sample-test-request-for-the-work-of-others-list.component';
import { SampleTestRequestForTheWorkOfOthersViewComponent } from './sample-test-request-for-the-work-of-others-view/sample-test-request-for-the-work-of-others-view.component';

const routes: Routes = [
  {
    path: '',
    component: SampleTestRequestForTheWorkOfOthersListComponent,
    canActivate: [SampleTestRequestForTheWorkOfOthersGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SampleTestRequestForTheWorkOfOthersNewComponent,
    canActivate: [SampleTestRequestForTheWorkOfOthersGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SampleTestRequestForTheWorkOfOthersEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SampleTestRequestForTheWorkOfOthersListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SampleTestRequestForTheWorkOfOthersViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SampleTestRequestForTheWorkOfOthersRoutingModule {
}
