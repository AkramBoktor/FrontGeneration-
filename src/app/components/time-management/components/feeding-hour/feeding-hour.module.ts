import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FeedingHourListComponent } from './feeding-hour-list/feeding-hour-list.component';
import { FeedingHourEditComponent } from './feeding-hour-edit/feeding-hour-edit.component';
import { FeedingHourNewComponent } from './feeding-hour-new/feeding-hour-new.component';
import { FeedingHourViewComponent } from './feeding-hour-view/feeding-hour-view.component';
import { FeedingHourRoutingModule } from './feeding-hour.routing.module';
import { FeedingHourService } from './shared/feeding-hour.service';
import { FeedingHourGuard } from './shared/feeding-hour.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FeedingHourListComponent,
    FeedingHourNewComponent,
    FeedingHourEditComponent,
    FeedingHourViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FeedingHourRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FeedingHourService,
    FeedingHourGuard
  ],
  entryComponents: [
    FeedingHourNewComponent,
    FeedingHourEditComponent,
    FeedingHourViewComponent
  ]
})

export class FeedingHourModule {
}
