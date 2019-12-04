import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GasAppliancesDataListComponent } from './gas-appliances-data-list/gas-appliances-data-list.component';
import { GasAppliancesDataEditComponent } from './gas-appliances-data-edit/gas-appliances-data-edit.component';
import { GasAppliancesDataNewComponent } from './gas-appliances-data-new/gas-appliances-data-new.component';
import { GasAppliancesDataViewComponent } from './gas-appliances-data-view/gas-appliances-data-view.component';
import { GasAppliancesDataRoutingModule } from './gas-appliances-data.routing.module';
import { GasAppliancesDataService } from './shared/gas-appliances-data.service';
import { GasAppliancesDataGuard } from './shared/gas-appliances-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GasAppliancesDataListComponent,
    GasAppliancesDataNewComponent,
    GasAppliancesDataEditComponent,
    GasAppliancesDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GasAppliancesDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GasAppliancesDataService,
    GasAppliancesDataGuard
  ],
  entryComponents: [
    GasAppliancesDataNewComponent,
    GasAppliancesDataEditComponent,
    GasAppliancesDataViewComponent
  ]
})

export class GasAppliancesDataModule {
}
