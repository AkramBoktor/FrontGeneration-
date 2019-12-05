import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddPlanGuard } from './shared/add-plan.guard';
import { AddPlanNewComponent } from './add-plan-new/add-plan-new.component';
import { AddPlanEditComponent } from './add-plan-edit/add-plan-edit.component';
import { AddPlanListComponent } from './add-plan-list/add-plan-list.component';
import { AddPlanViewComponent } from './add-plan-view/add-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddPlanListComponent,
    canActivate: [AddPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddPlanNewComponent,
    canActivate: [AddPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddPlanRoutingModule {
}
