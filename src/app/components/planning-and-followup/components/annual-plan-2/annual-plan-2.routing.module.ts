import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AnnualPlan2Guard } from './shared/annual-plan-2.guard';
import { AnnualPlan2NewComponent } from './annual-plan-2-new/annual-plan-2-new.component';
import { AnnualPlan2EditComponent } from './annual-plan-2-edit/annual-plan-2-edit.component';
import { AnnualPlan2ListComponent } from './annual-plan-2-list/annual-plan-2-list.component';
import { AnnualPlan2ViewComponent } from './annual-plan-2-view/annual-plan-2-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnnualPlan2ListComponent,
    canActivate: [AnnualPlan2Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AnnualPlan2NewComponent,
    canActivate: [AnnualPlan2Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AnnualPlan2EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AnnualPlan2ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AnnualPlan2ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AnnualPlan2RoutingModule {
}
