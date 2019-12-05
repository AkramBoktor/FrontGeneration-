import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataOfTheLandSeriesInLegalAffairsListComponent } from './data-of-the-land-series-in-legal-affairs-list/data-of-the-land-series-in-legal-affairs-list.component';
import { DataOfTheLandSeriesInLegalAffairsEditComponent } from './data-of-the-land-series-in-legal-affairs-edit/data-of-the-land-series-in-legal-affairs-edit.component';
import { DataOfTheLandSeriesInLegalAffairsNewComponent } from './data-of-the-land-series-in-legal-affairs-new/data-of-the-land-series-in-legal-affairs-new.component';
import { DataOfTheLandSeriesInLegalAffairsViewComponent } from './data-of-the-land-series-in-legal-affairs-view/data-of-the-land-series-in-legal-affairs-view.component';
import { DataOfTheLandSeriesInLegalAffairsRoutingModule } from './data-of-the-land-series-in-legal-affairs.routing.module';
import { DataOfTheLandSeriesInLegalAffairsService } from './shared/data-of-the-land-series-in-legal-affairs.service';
import { DataOfTheLandSeriesInLegalAffairsGuard } from './shared/data-of-the-land-series-in-legal-affairs.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataOfTheLandSeriesInLegalAffairsListComponent,
    DataOfTheLandSeriesInLegalAffairsNewComponent,
    DataOfTheLandSeriesInLegalAffairsEditComponent,
    DataOfTheLandSeriesInLegalAffairsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataOfTheLandSeriesInLegalAffairsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataOfTheLandSeriesInLegalAffairsService,
    DataOfTheLandSeriesInLegalAffairsGuard
  ],
  entryComponents: [
    DataOfTheLandSeriesInLegalAffairsNewComponent,
    DataOfTheLandSeriesInLegalAffairsEditComponent,
    DataOfTheLandSeriesInLegalAffairsViewComponent
  ]
})

export class DataOfTheLandSeriesInLegalAffairsModule {
}
