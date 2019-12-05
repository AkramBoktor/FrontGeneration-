import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BindingItemWithScheduleActivitiesGuard } from './shared/binding-item-with-schedule-activities.guard';
import { BindingItemWithScheduleActivitiesNewComponent } from './binding-item-with-schedule-activities-new/binding-item-with-schedule-activities-new.component';
import { BindingItemWithScheduleActivitiesEditComponent } from './binding-item-with-schedule-activities-edit/binding-item-with-schedule-activities-edit.component';
import { BindingItemWithScheduleActivitiesListComponent } from './binding-item-with-schedule-activities-list/binding-item-with-schedule-activities-list.component';
import { BindingItemWithScheduleActivitiesViewComponent } from './binding-item-with-schedule-activities-view/binding-item-with-schedule-activities-view.component';

const routes: Routes = [
  {
    path: '',
    component: BindingItemWithScheduleActivitiesListComponent,
    canActivate: [BindingItemWithScheduleActivitiesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BindingItemWithScheduleActivitiesNewComponent,
    canActivate: [BindingItemWithScheduleActivitiesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BindingItemWithScheduleActivitiesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BindingItemWithScheduleActivitiesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BindingItemWithScheduleActivitiesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BindingItemWithScheduleActivitiesRoutingModule {
}
