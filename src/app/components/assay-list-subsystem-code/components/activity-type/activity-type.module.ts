import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ActivityTypeListComponent } from './activity-type-list/activity-type-list.component';
import { ActivityTypeEditComponent } from './activity-type-edit/activity-type-edit.component';
import { ActivityTypeNewComponent } from './activity-type-new/activity-type-new.component';
import { ActivityTypeViewComponent } from './activity-type-view/activity-type-view.component';
import { ActivityTypeRoutingModule } from './activity-type.routing.module';
import { ActivityTypeService } from './shared/activity-type.service';
import { ActivityTypeGuard } from './shared/activity-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ActivityTypeListComponent,
    ActivityTypeNewComponent,
    ActivityTypeEditComponent,
    ActivityTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ActivityTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ActivityTypeService,
    ActivityTypeGuard
  ],
  entryComponents: [
    ActivityTypeNewComponent,
    ActivityTypeEditComponent,
    ActivityTypeViewComponent
  ]
})

export class ActivityTypeModule {
}
