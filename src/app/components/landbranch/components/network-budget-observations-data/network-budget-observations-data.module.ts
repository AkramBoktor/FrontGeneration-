import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NetworkBudgetObservationsDataListComponent } from './network-budget-observations-data-list/network-budget-observations-data-list.component';
import { NetworkBudgetObservationsDataEditComponent } from './network-budget-observations-data-edit/network-budget-observations-data-edit.component';
import { NetworkBudgetObservationsDataNewComponent } from './network-budget-observations-data-new/network-budget-observations-data-new.component';
import { NetworkBudgetObservationsDataViewComponent } from './network-budget-observations-data-view/network-budget-observations-data-view.component';
import { NetworkBudgetObservationsDataRoutingModule } from './network-budget-observations-data.routing.module';
import { NetworkBudgetObservationsDataService } from './shared/network-budget-observations-data.service';
import { NetworkBudgetObservationsDataGuard } from './shared/network-budget-observations-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NetworkBudgetObservationsDataListComponent,
    NetworkBudgetObservationsDataNewComponent,
    NetworkBudgetObservationsDataEditComponent,
    NetworkBudgetObservationsDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NetworkBudgetObservationsDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NetworkBudgetObservationsDataService,
    NetworkBudgetObservationsDataGuard
  ],
  entryComponents: [
    NetworkBudgetObservationsDataNewComponent,
    NetworkBudgetObservationsDataEditComponent,
    NetworkBudgetObservationsDataViewComponent
  ]
})

export class NetworkBudgetObservationsDataModule {
}
