import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CastingDataForSampleForTheWorkOfOthersListComponent } from './casting-data-for-sample-for-the-work-of-others-list/casting-data-for-sample-for-the-work-of-others-list.component';
import { CastingDataForSampleForTheWorkOfOthersEditComponent } from './casting-data-for-sample-for-the-work-of-others-edit/casting-data-for-sample-for-the-work-of-others-edit.component';
import { CastingDataForSampleForTheWorkOfOthersNewComponent } from './casting-data-for-sample-for-the-work-of-others-new/casting-data-for-sample-for-the-work-of-others-new.component';
import { CastingDataForSampleForTheWorkOfOthersViewComponent } from './casting-data-for-sample-for-the-work-of-others-view/casting-data-for-sample-for-the-work-of-others-view.component';
import { CastingDataForSampleForTheWorkOfOthersRoutingModule } from './casting-data-for-sample-for-the-work-of-others.routing.module';
import { CastingDataForSampleForTheWorkOfOthersService } from './shared/casting-data-for-sample-for-the-work-of-others.service';
import { CastingDataForSampleForTheWorkOfOthersGuard } from './shared/casting-data-for-sample-for-the-work-of-others.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CastingDataForSampleForTheWorkOfOthersListComponent,
    CastingDataForSampleForTheWorkOfOthersNewComponent,
    CastingDataForSampleForTheWorkOfOthersEditComponent,
    CastingDataForSampleForTheWorkOfOthersViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CastingDataForSampleForTheWorkOfOthersRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CastingDataForSampleForTheWorkOfOthersService,
    CastingDataForSampleForTheWorkOfOthersGuard
  ],
  entryComponents: [
    CastingDataForSampleForTheWorkOfOthersNewComponent,
    CastingDataForSampleForTheWorkOfOthersEditComponent,
    CastingDataForSampleForTheWorkOfOthersViewComponent
  ]
})

export class CastingDataForSampleForTheWorkOfOthersModule {
}
