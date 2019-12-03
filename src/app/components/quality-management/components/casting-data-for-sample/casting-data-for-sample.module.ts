import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CastingDataForSampleListComponent } from './casting-data-for-sample-list/casting-data-for-sample-list.component';
import { CastingDataForSampleEditComponent } from './casting-data-for-sample-edit/casting-data-for-sample-edit.component';
import { CastingDataForSampleNewComponent } from './casting-data-for-sample-new/casting-data-for-sample-new.component';
import { CastingDataForSampleViewComponent } from './casting-data-for-sample-view/casting-data-for-sample-view.component';
import { CastingDataForSampleRoutingModule } from './casting-data-for-sample.routing.module';
import { CastingDataForSampleService } from './shared/casting-data-for-sample.service';
import { CastingDataForSampleGuard } from './shared/casting-data-for-sample.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CastingDataForSampleListComponent,
    CastingDataForSampleNewComponent,
    CastingDataForSampleEditComponent,
    CastingDataForSampleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CastingDataForSampleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CastingDataForSampleService,
    CastingDataForSampleGuard
  ],
  entryComponents: [
    CastingDataForSampleNewComponent,
    CastingDataForSampleEditComponent,
    CastingDataForSampleViewComponent
  ]
})

export class CastingDataForSampleModule {
}
