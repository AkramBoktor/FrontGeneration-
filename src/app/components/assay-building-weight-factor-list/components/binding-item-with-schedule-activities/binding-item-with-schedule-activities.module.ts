import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BindingItemWithScheduleActivitiesListComponent } from './binding-item-with-schedule-activities-list/binding-item-with-schedule-activities-list.component';
import { BindingItemWithScheduleActivitiesEditComponent } from './binding-item-with-schedule-activities-edit/binding-item-with-schedule-activities-edit.component';
import { BindingItemWithScheduleActivitiesNewComponent } from './binding-item-with-schedule-activities-new/binding-item-with-schedule-activities-new.component';
import { BindingItemWithScheduleActivitiesViewComponent } from './binding-item-with-schedule-activities-view/binding-item-with-schedule-activities-view.component';
import { BindingItemWithScheduleActivitiesRoutingModule } from './binding-item-with-schedule-activities.routing.module';
import { BindingItemWithScheduleActivitiesService } from './shared/binding-item-with-schedule-activities.service';
import { BindingItemWithScheduleActivitiesGuard } from './shared/binding-item-with-schedule-activities.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BindingItemWithScheduleActivitiesListComponent,
    BindingItemWithScheduleActivitiesNewComponent,
    BindingItemWithScheduleActivitiesEditComponent,
    BindingItemWithScheduleActivitiesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BindingItemWithScheduleActivitiesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BindingItemWithScheduleActivitiesService,
    BindingItemWithScheduleActivitiesGuard
  ],
  entryComponents: [
    BindingItemWithScheduleActivitiesNewComponent,
    BindingItemWithScheduleActivitiesEditComponent,
    BindingItemWithScheduleActivitiesViewComponent
  ]
})

export class BindingItemWithScheduleActivitiesModule {
}
