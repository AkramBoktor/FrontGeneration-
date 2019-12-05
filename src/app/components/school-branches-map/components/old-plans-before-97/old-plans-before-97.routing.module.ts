import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OldPlansBefore97Guard } from './shared/old-plans-before-97.guard';
import { OldPlansBefore97NewComponent } from './old-plans-before-97-new/old-plans-before-97-new.component';
import { OldPlansBefore97EditComponent } from './old-plans-before-97-edit/old-plans-before-97-edit.component';
import { OldPlansBefore97ListComponent } from './old-plans-before-97-list/old-plans-before-97-list.component';
import { OldPlansBefore97ViewComponent } from './old-plans-before-97-view/old-plans-before-97-view.component';

const routes: Routes = [
  {
    path: '',
    component: OldPlansBefore97ListComponent,
    canActivate: [OldPlansBefore97Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: OldPlansBefore97NewComponent,
    canActivate: [OldPlansBefore97Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: OldPlansBefore97EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: OldPlansBefore97ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: OldPlansBefore97ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OldPlansBefore97RoutingModule {
}
