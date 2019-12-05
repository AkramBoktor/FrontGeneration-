import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TransferOfSupplyOrdersFromSchoolsClosureListComponent } from './transfer-of-supply-orders-from-schools-closure-list/transfer-of-supply-orders-from-schools-closure-list.component';
import { TransferOfSupplyOrdersFromSchoolsClosureEditComponent } from './transfer-of-supply-orders-from-schools-closure-edit/transfer-of-supply-orders-from-schools-closure-edit.component';
import { TransferOfSupplyOrdersFromSchoolsClosureNewComponent } from './transfer-of-supply-orders-from-schools-closure-new/transfer-of-supply-orders-from-schools-closure-new.component';
import { TransferOfSupplyOrdersFromSchoolsClosureViewComponent } from './transfer-of-supply-orders-from-schools-closure-view/transfer-of-supply-orders-from-schools-closure-view.component';
import { TransferOfSupplyOrdersFromSchoolsClosureRoutingModule } from './transfer-of-supply-orders-from-schools-closure.routing.module';
import { TransferOfSupplyOrdersFromSchoolsClosureService } from './shared/transfer-of-supply-orders-from-schools-closure.service';
import { TransferOfSupplyOrdersFromSchoolsClosureGuard } from './shared/transfer-of-supply-orders-from-schools-closure.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TransferOfSupplyOrdersFromSchoolsClosureListComponent,
    TransferOfSupplyOrdersFromSchoolsClosureNewComponent,
    TransferOfSupplyOrdersFromSchoolsClosureEditComponent,
    TransferOfSupplyOrdersFromSchoolsClosureViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TransferOfSupplyOrdersFromSchoolsClosureRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TransferOfSupplyOrdersFromSchoolsClosureService,
    TransferOfSupplyOrdersFromSchoolsClosureGuard
  ],
  entryComponents: [
    TransferOfSupplyOrdersFromSchoolsClosureNewComponent,
    TransferOfSupplyOrdersFromSchoolsClosureEditComponent,
    TransferOfSupplyOrdersFromSchoolsClosureViewComponent
  ]
})

export class TransferOfSupplyOrdersFromSchoolsClosureModule {
}
