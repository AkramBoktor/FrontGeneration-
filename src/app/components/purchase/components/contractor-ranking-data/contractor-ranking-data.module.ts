import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractorRankingDataListComponent } from './contractor-ranking-data-list/contractor-ranking-data-list.component';
import { ContractorRankingDataEditComponent } from './contractor-ranking-data-edit/contractor-ranking-data-edit.component';
import { ContractorRankingDataNewComponent } from './contractor-ranking-data-new/contractor-ranking-data-new.component';
import { ContractorRankingDataViewComponent } from './contractor-ranking-data-view/contractor-ranking-data-view.component';
import { ContractorRankingDataRoutingModule } from './contractor-ranking-data.routing.module';
import { ContractorRankingDataService } from './shared/contractor-ranking-data.service';
import { ContractorRankingDataGuard } from './shared/contractor-ranking-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContractorRankingDataListComponent,
    ContractorRankingDataNewComponent,
    ContractorRankingDataEditComponent,
    ContractorRankingDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractorRankingDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractorRankingDataService,
    ContractorRankingDataGuard
  ],
  entryComponents: [
    ContractorRankingDataNewComponent,
    ContractorRankingDataEditComponent,
    ContractorRankingDataViewComponent
  ]
})

export class ContractorRankingDataModule {
}
