import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CastingDataForSampleForTheWorkOfOthersGuard } from './shared/casting-data-for-sample-for-the-work-of-others.guard';
import { CastingDataForSampleForTheWorkOfOthersNewComponent } from './casting-data-for-sample-for-the-work-of-others-new/casting-data-for-sample-for-the-work-of-others-new.component';
import { CastingDataForSampleForTheWorkOfOthersEditComponent } from './casting-data-for-sample-for-the-work-of-others-edit/casting-data-for-sample-for-the-work-of-others-edit.component';
import { CastingDataForSampleForTheWorkOfOthersListComponent } from './casting-data-for-sample-for-the-work-of-others-list/casting-data-for-sample-for-the-work-of-others-list.component';
import { CastingDataForSampleForTheWorkOfOthersViewComponent } from './casting-data-for-sample-for-the-work-of-others-view/casting-data-for-sample-for-the-work-of-others-view.component';

const routes: Routes = [
  {
    path: '',
    component: CastingDataForSampleForTheWorkOfOthersListComponent,
    canActivate: [CastingDataForSampleForTheWorkOfOthersGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CastingDataForSampleForTheWorkOfOthersNewComponent,
    canActivate: [CastingDataForSampleForTheWorkOfOthersGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CastingDataForSampleForTheWorkOfOthersEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CastingDataForSampleForTheWorkOfOthersListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CastingDataForSampleForTheWorkOfOthersViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CastingDataForSampleForTheWorkOfOthersRoutingModule {
}
