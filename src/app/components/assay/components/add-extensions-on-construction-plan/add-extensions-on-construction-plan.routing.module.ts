import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddExtensionsOnConstructionPlanGuard } from './shared/add-extensions-on-construction-plan.guard';
import { AddExtensionsOnConstructionPlanNewComponent } from './add-extensions-on-construction-plan-new/add-extensions-on-construction-plan-new.component';
import { AddExtensionsOnConstructionPlanEditComponent } from './add-extensions-on-construction-plan-edit/add-extensions-on-construction-plan-edit.component';
import { AddExtensionsOnConstructionPlanListComponent } from './add-extensions-on-construction-plan-list/add-extensions-on-construction-plan-list.component';
import { AddExtensionsOnConstructionPlanViewComponent } from './add-extensions-on-construction-plan-view/add-extensions-on-construction-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddExtensionsOnConstructionPlanListComponent,
    canActivate: [AddExtensionsOnConstructionPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddExtensionsOnConstructionPlanNewComponent,
    canActivate: [AddExtensionsOnConstructionPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddExtensionsOnConstructionPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddExtensionsOnConstructionPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddExtensionsOnConstructionPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddExtensionsOnConstructionPlanRoutingModule {
}
