import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CastingDataForSampleGuard } from './shared/casting-data-for-sample.guard';
import { CastingDataForSampleNewComponent } from './casting-data-for-sample-new/casting-data-for-sample-new.component';
import { CastingDataForSampleEditComponent } from './casting-data-for-sample-edit/casting-data-for-sample-edit.component';
import { CastingDataForSampleListComponent } from './casting-data-for-sample-list/casting-data-for-sample-list.component';
import { CastingDataForSampleViewComponent } from './casting-data-for-sample-view/casting-data-for-sample-view.component';

const routes: Routes = [
  {
    path: '',
    component: CastingDataForSampleListComponent,
    canActivate: [CastingDataForSampleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CastingDataForSampleNewComponent,
    canActivate: [CastingDataForSampleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CastingDataForSampleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CastingDataForSampleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CastingDataForSampleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CastingDataForSampleRoutingModule {
}
