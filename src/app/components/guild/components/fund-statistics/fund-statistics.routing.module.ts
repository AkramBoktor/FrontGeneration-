import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FundStatisticsGuard } from './shared/fund-statistics.guard';
import { FundStatisticsNewComponent } from './fund-statistics-new/fund-statistics-new.component';
import { FundStatisticsEditComponent } from './fund-statistics-edit/fund-statistics-edit.component';
import { FundStatisticsListComponent } from './fund-statistics-list/fund-statistics-list.component';
import { FundStatisticsViewComponent } from './fund-statistics-view/fund-statistics-view.component';

const routes: Routes = [
  {
    path: '',
    component: FundStatisticsListComponent,
    canActivate: [FundStatisticsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FundStatisticsNewComponent,
    canActivate: [FundStatisticsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FundStatisticsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FundStatisticsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FundStatisticsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FundStatisticsRoutingModule {
}
