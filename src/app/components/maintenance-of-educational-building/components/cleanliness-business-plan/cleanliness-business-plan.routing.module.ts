import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CleanlinessBusinessPlanGuard } from './shared/cleanliness-business-plan.guard';
import { CleanlinessBusinessPlanNewComponent } from './cleanliness-business-plan-new/cleanliness-business-plan-new.component';
import { CleanlinessBusinessPlanEditComponent } from './cleanliness-business-plan-edit/cleanliness-business-plan-edit.component';
import { CleanlinessBusinessPlanListComponent } from './cleanliness-business-plan-list/cleanliness-business-plan-list.component';
import { CleanlinessBusinessPlanViewComponent } from './cleanliness-business-plan-view/cleanliness-business-plan-view.component';

const routes: Routes = [
  {
    path: '',
    component: CleanlinessBusinessPlanListComponent,
    canActivate: [CleanlinessBusinessPlanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CleanlinessBusinessPlanNewComponent,
    canActivate: [CleanlinessBusinessPlanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CleanlinessBusinessPlanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CleanlinessBusinessPlanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CleanlinessBusinessPlanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CleanlinessBusinessPlanRoutingModule {
}
