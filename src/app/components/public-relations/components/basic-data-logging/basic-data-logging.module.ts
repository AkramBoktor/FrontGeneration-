import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BasicDataLoggingListComponent } from './basic-data-logging-list/basic-data-logging-list.component';
import { BasicDataLoggingEditComponent } from './basic-data-logging-edit/basic-data-logging-edit.component';
import { BasicDataLoggingNewComponent } from './basic-data-logging-new/basic-data-logging-new.component';
import { BasicDataLoggingViewComponent } from './basic-data-logging-view/basic-data-logging-view.component';
import { BasicDataLoggingRoutingModule } from './basic-data-logging.routing.module';
import { BasicDataLoggingService } from './shared/basic-data-logging.service';
import { BasicDataLoggingGuard } from './shared/basic-data-logging.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BasicDataLoggingListComponent,
    BasicDataLoggingNewComponent,
    BasicDataLoggingEditComponent,
    BasicDataLoggingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BasicDataLoggingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BasicDataLoggingService,
    BasicDataLoggingGuard
  ],
  entryComponents: [
    BasicDataLoggingNewComponent,
    BasicDataLoggingEditComponent,
    BasicDataLoggingViewComponent
  ]
})

export class BasicDataLoggingModule {
}
