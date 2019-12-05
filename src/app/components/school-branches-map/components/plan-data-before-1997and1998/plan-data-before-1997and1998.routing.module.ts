import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PlanDataBefore1997and1998Guard } from './shared/plan-data-before-1997and1998.guard';
import { PlanDataBefore1997and1998NewComponent } from './plan-data-before-1997and1998-new/plan-data-before-1997and1998-new.component';
import { PlanDataBefore1997and1998EditComponent } from './plan-data-before-1997and1998-edit/plan-data-before-1997and1998-edit.component';
import { PlanDataBefore1997and1998ListComponent } from './plan-data-before-1997and1998-list/plan-data-before-1997and1998-list.component';
import { PlanDataBefore1997and1998ViewComponent } from './plan-data-before-1997and1998-view/plan-data-before-1997and1998-view.component';

const routes: Routes = [
  {
    path: '',
    component: PlanDataBefore1997and1998ListComponent,
    canActivate: [PlanDataBefore1997and1998Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PlanDataBefore1997and1998NewComponent,
    canActivate: [PlanDataBefore1997and1998Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PlanDataBefore1997and1998EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PlanDataBefore1997and1998ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PlanDataBefore1997and1998ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PlanDataBefore1997and1998RoutingModule {
}
