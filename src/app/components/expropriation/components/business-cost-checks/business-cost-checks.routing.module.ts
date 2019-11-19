import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BusinessCostChecksGuard } from './shared/business-cost-checks.guard';
import { BusinessCostChecksNewComponent } from './business-cost-checks-new/business-cost-checks-new.component';
import { BusinessCostChecksEditComponent } from './business-cost-checks-edit/business-cost-checks-edit.component';
import { BusinessCostChecksListComponent } from './business-cost-checks-list/business-cost-checks-list.component';
import { BusinessCostChecksViewComponent } from './business-cost-checks-view/business-cost-checks-view.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessCostChecksListComponent,
    canActivate: [BusinessCostChecksGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BusinessCostChecksNewComponent,
    canActivate: [BusinessCostChecksGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BusinessCostChecksEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BusinessCostChecksListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BusinessCostChecksViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BusinessCostChecksRoutingModule {
}
