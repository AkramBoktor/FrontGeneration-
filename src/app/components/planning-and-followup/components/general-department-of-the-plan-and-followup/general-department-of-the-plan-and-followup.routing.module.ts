import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GeneralDepartmentOfThePlanAndFollowupGuard } from './shared/general-department-of-the-plan-and-followup.guard';
import { GeneralDepartmentOfThePlanAndFollowupNewComponent } from './general-department-of-the-plan-and-followup-new/general-department-of-the-plan-and-followup-new.component';
import { GeneralDepartmentOfThePlanAndFollowupEditComponent } from './general-department-of-the-plan-and-followup-edit/general-department-of-the-plan-and-followup-edit.component';
import { GeneralDepartmentOfThePlanAndFollowupListComponent } from './general-department-of-the-plan-and-followup-list/general-department-of-the-plan-and-followup-list.component';
import { GeneralDepartmentOfThePlanAndFollowupViewComponent } from './general-department-of-the-plan-and-followup-view/general-department-of-the-plan-and-followup-view.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralDepartmentOfThePlanAndFollowupListComponent,
    canActivate: [GeneralDepartmentOfThePlanAndFollowupGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GeneralDepartmentOfThePlanAndFollowupNewComponent,
    canActivate: [GeneralDepartmentOfThePlanAndFollowupGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GeneralDepartmentOfThePlanAndFollowupEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GeneralDepartmentOfThePlanAndFollowupListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GeneralDepartmentOfThePlanAndFollowupViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GeneralDepartmentOfThePlanAndFollowupRoutingModule {
}
