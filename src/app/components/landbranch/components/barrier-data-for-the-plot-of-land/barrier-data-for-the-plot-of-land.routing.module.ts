import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BarrierDataForThePlotOfLandGuard } from './shared/barrier-data-for-the-plot-of-land.guard';
import { BarrierDataForThePlotOfLandNewComponent } from './barrier-data-for-the-plot-of-land-new/barrier-data-for-the-plot-of-land-new.component';
import { BarrierDataForThePlotOfLandEditComponent } from './barrier-data-for-the-plot-of-land-edit/barrier-data-for-the-plot-of-land-edit.component';
import { BarrierDataForThePlotOfLandListComponent } from './barrier-data-for-the-plot-of-land-list/barrier-data-for-the-plot-of-land-list.component';
import { BarrierDataForThePlotOfLandViewComponent } from './barrier-data-for-the-plot-of-land-view/barrier-data-for-the-plot-of-land-view.component';

const routes: Routes = [
  {
    path: '',
    component: BarrierDataForThePlotOfLandListComponent,
    canActivate: [BarrierDataForThePlotOfLandGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BarrierDataForThePlotOfLandNewComponent,
    canActivate: [BarrierDataForThePlotOfLandGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BarrierDataForThePlotOfLandEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BarrierDataForThePlotOfLandListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BarrierDataForThePlotOfLandViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BarrierDataForThePlotOfLandRoutingModule {
}
