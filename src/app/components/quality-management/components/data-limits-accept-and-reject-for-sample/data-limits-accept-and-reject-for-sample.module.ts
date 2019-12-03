import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataLimitsAcceptAndRejectForSampleListComponent } from './data-limits-accept-and-reject-for-sample-list/data-limits-accept-and-reject-for-sample-list.component';
import { DataLimitsAcceptAndRejectForSampleEditComponent } from './data-limits-accept-and-reject-for-sample-edit/data-limits-accept-and-reject-for-sample-edit.component';
import { DataLimitsAcceptAndRejectForSampleNewComponent } from './data-limits-accept-and-reject-for-sample-new/data-limits-accept-and-reject-for-sample-new.component';
import { DataLimitsAcceptAndRejectForSampleViewComponent } from './data-limits-accept-and-reject-for-sample-view/data-limits-accept-and-reject-for-sample-view.component';
import { DataLimitsAcceptAndRejectForSampleRoutingModule } from './data-limits-accept-and-reject-for-sample.routing.module';
import { DataLimitsAcceptAndRejectForSampleService } from './shared/data-limits-accept-and-reject-for-sample.service';
import { DataLimitsAcceptAndRejectForSampleGuard } from './shared/data-limits-accept-and-reject-for-sample.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataLimitsAcceptAndRejectForSampleListComponent,
    DataLimitsAcceptAndRejectForSampleNewComponent,
    DataLimitsAcceptAndRejectForSampleEditComponent,
    DataLimitsAcceptAndRejectForSampleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataLimitsAcceptAndRejectForSampleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataLimitsAcceptAndRejectForSampleService,
    DataLimitsAcceptAndRejectForSampleGuard
  ],
  entryComponents: [
    DataLimitsAcceptAndRejectForSampleNewComponent,
    DataLimitsAcceptAndRejectForSampleEditComponent,
    DataLimitsAcceptAndRejectForSampleViewComponent
  ]
})

export class DataLimitsAcceptAndRejectForSampleModule {
}
