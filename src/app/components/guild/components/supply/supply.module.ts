import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SupplyListComponent } from './supply-list/supply-list.component';
import { SupplyEditComponent } from './supply-edit/supply-edit.component';
import { SupplyNewComponent } from './supply-new/supply-new.component';
import { SupplyViewComponent } from './supply-view/supply-view.component';
import { SupplyRoutingModule } from './supply.routing.module';
import { SupplyService } from './shared/supply.service';
import { SupplyGuard } from './shared/supply.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SupplyListComponent,
    SupplyNewComponent,
    SupplyEditComponent,
    SupplyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SupplyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SupplyService,
    SupplyGuard
  ],
  entryComponents: [
    SupplyNewComponent,
    SupplyEditComponent,
    SupplyViewComponent
  ]
})

export class SupplyModule {
}
