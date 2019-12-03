import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddPlanConditioningGuard } from './shared/add-plan-conditioning.guard';
import { AddPlanConditioningNewComponent } from './add-plan-conditioning-new/add-plan-conditioning-new.component';
import { AddPlanConditioningEditComponent } from './add-plan-conditioning-edit/add-plan-conditioning-edit.component';
import { AddPlanConditioningListComponent } from './add-plan-conditioning-list/add-plan-conditioning-list.component';
import { AddPlanConditioningViewComponent } from './add-plan-conditioning-view/add-plan-conditioning-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddPlanConditioningListComponent,
    canActivate: [AddPlanConditioningGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddPlanConditioningNewComponent,
    canActivate: [AddPlanConditioningGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddPlanConditioningEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddPlanConditioningListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddPlanConditioningViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddPlanConditioningRoutingModule {
}
