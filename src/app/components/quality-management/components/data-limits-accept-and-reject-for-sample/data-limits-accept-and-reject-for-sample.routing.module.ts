import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataLimitsAcceptAndRejectForSampleGuard } from './shared/data-limits-accept-and-reject-for-sample.guard';
import { DataLimitsAcceptAndRejectForSampleNewComponent } from './data-limits-accept-and-reject-for-sample-new/data-limits-accept-and-reject-for-sample-new.component';
import { DataLimitsAcceptAndRejectForSampleEditComponent } from './data-limits-accept-and-reject-for-sample-edit/data-limits-accept-and-reject-for-sample-edit.component';
import { DataLimitsAcceptAndRejectForSampleListComponent } from './data-limits-accept-and-reject-for-sample-list/data-limits-accept-and-reject-for-sample-list.component';
import { DataLimitsAcceptAndRejectForSampleViewComponent } from './data-limits-accept-and-reject-for-sample-view/data-limits-accept-and-reject-for-sample-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataLimitsAcceptAndRejectForSampleListComponent,
    canActivate: [DataLimitsAcceptAndRejectForSampleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataLimitsAcceptAndRejectForSampleNewComponent,
    canActivate: [DataLimitsAcceptAndRejectForSampleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataLimitsAcceptAndRejectForSampleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataLimitsAcceptAndRejectForSampleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataLimitsAcceptAndRejectForSampleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataLimitsAcceptAndRejectForSampleRoutingModule {
}
