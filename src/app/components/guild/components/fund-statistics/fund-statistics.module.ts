import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FundStatisticsListComponent } from './fund-statistics-list/fund-statistics-list.component';
import { FundStatisticsEditComponent } from './fund-statistics-edit/fund-statistics-edit.component';
import { FundStatisticsNewComponent } from './fund-statistics-new/fund-statistics-new.component';
import { FundStatisticsViewComponent } from './fund-statistics-view/fund-statistics-view.component';
import { FundStatisticsRoutingModule } from './fund-statistics.routing.module';
import { FundStatisticsService } from './shared/fund-statistics.service';
import { FundStatisticsGuard } from './shared/fund-statistics.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FundStatisticsListComponent,
    FundStatisticsNewComponent,
    FundStatisticsEditComponent,
    FundStatisticsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FundStatisticsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FundStatisticsService,
    FundStatisticsGuard
  ],
  entryComponents: [
    FundStatisticsNewComponent,
    FundStatisticsEditComponent,
    FundStatisticsViewComponent
  ]
})

export class FundStatisticsModule {
}
