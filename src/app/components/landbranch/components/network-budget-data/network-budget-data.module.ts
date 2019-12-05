import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NetworkBudgetDataListComponent } from './network-budget-data-list/network-budget-data-list.component';
import { NetworkBudgetDataEditComponent } from './network-budget-data-edit/network-budget-data-edit.component';
import { NetworkBudgetDataNewComponent } from './network-budget-data-new/network-budget-data-new.component';
import { NetworkBudgetDataViewComponent } from './network-budget-data-view/network-budget-data-view.component';
import { NetworkBudgetDataRoutingModule } from './network-budget-data.routing.module';
import { NetworkBudgetDataService } from './shared/network-budget-data.service';
import { NetworkBudgetDataGuard } from './shared/network-budget-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NetworkBudgetDataListComponent,
    NetworkBudgetDataNewComponent,
    NetworkBudgetDataEditComponent,
    NetworkBudgetDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NetworkBudgetDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NetworkBudgetDataService,
    NetworkBudgetDataGuard
  ],
  entryComponents: [
    NetworkBudgetDataNewComponent,
    NetworkBudgetDataEditComponent,
    NetworkBudgetDataViewComponent
  ]
})

export class NetworkBudgetDataModule {
}
