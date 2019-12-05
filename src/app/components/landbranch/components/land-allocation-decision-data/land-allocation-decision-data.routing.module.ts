import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LandAllocationDecisionDataGuard } from './shared/land-allocation-decision-data.guard';
import { LandAllocationDecisionDataNewComponent } from './land-allocation-decision-data-new/land-allocation-decision-data-new.component';
import { LandAllocationDecisionDataEditComponent } from './land-allocation-decision-data-edit/land-allocation-decision-data-edit.component';
import { LandAllocationDecisionDataListComponent } from './land-allocation-decision-data-list/land-allocation-decision-data-list.component';
import { LandAllocationDecisionDataViewComponent } from './land-allocation-decision-data-view/land-allocation-decision-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: LandAllocationDecisionDataListComponent,
    canActivate: [LandAllocationDecisionDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LandAllocationDecisionDataNewComponent,
    canActivate: [LandAllocationDecisionDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LandAllocationDecisionDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LandAllocationDecisionDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LandAllocationDecisionDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandAllocationDecisionDataRoutingModule {
}
