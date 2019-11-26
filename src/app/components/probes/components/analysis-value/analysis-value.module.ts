import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AnalysisValueListComponent } from './analysis-value-list/analysis-value-list.component';
import { AnalysisValueEditComponent } from './analysis-value-edit/analysis-value-edit.component';
import { AnalysisValueNewComponent } from './analysis-value-new/analysis-value-new.component';
import { AnalysisValueViewComponent } from './analysis-value-view/analysis-value-view.component';
import { AnalysisValueRoutingModule } from './analysis-value.routing.module';
import { AnalysisValueService } from './shared/analysis-value.service';
import { AnalysisValueGuard } from './shared/analysis-value.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AnalysisValueListComponent,
    AnalysisValueNewComponent,
    AnalysisValueEditComponent,
    AnalysisValueViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AnalysisValueRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AnalysisValueService,
    AnalysisValueGuard
  ],
  entryComponents: [
    AnalysisValueNewComponent,
    AnalysisValueEditComponent,
    AnalysisValueViewComponent
  ]
})

export class AnalysisValueModule {
}
