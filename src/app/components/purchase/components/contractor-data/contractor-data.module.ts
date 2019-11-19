import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractorDataListComponent } from './contractor-data-list/contractor-data-list.component';
import { ContractorDataEditComponent } from './contractor-data-edit/contractor-data-edit.component';
import { ContractorDataNewComponent } from './contractor-data-new/contractor-data-new.component';
import { ContractorDataViewComponent } from './contractor-data-view/contractor-data-view.component';
import { ContractorDataRoutingModule } from './contractor-data.routing.module';
import { ContractorDataService } from './shared/contractor-data.service';
import { ContractorDataGuard } from './shared/contractor-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContractorDataListComponent,
    ContractorDataNewComponent,
    ContractorDataEditComponent,
    ContractorDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractorDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractorDataService,
    ContractorDataGuard
  ],
  entryComponents: [
    ContractorDataNewComponent,
    ContractorDataEditComponent,
    ContractorDataViewComponent
  ]
})

export class ContractorDataModule {
}
