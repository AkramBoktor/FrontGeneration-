import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SampleResultForTheWorkOfOthersGuard } from './shared/sample-result-for-the-work-of-others.guard';
import { SampleResultForTheWorkOfOthersNewComponent } from './sample-result-for-the-work-of-others-new/sample-result-for-the-work-of-others-new.component';
import { SampleResultForTheWorkOfOthersEditComponent } from './sample-result-for-the-work-of-others-edit/sample-result-for-the-work-of-others-edit.component';
import { SampleResultForTheWorkOfOthersListComponent } from './sample-result-for-the-work-of-others-list/sample-result-for-the-work-of-others-list.component';
import { SampleResultForTheWorkOfOthersViewComponent } from './sample-result-for-the-work-of-others-view/sample-result-for-the-work-of-others-view.component';

const routes: Routes = [
  {
    path: '',
    component: SampleResultForTheWorkOfOthersListComponent,
    canActivate: [SampleResultForTheWorkOfOthersGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SampleResultForTheWorkOfOthersNewComponent,
    canActivate: [SampleResultForTheWorkOfOthersGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SampleResultForTheWorkOfOthersEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SampleResultForTheWorkOfOthersListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SampleResultForTheWorkOfOthersViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SampleResultForTheWorkOfOthersRoutingModule {
}
