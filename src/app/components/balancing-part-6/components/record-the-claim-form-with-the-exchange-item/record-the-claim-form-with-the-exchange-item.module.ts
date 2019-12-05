import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordTheClaimFormWithTheExchangeItemListComponent } from './record-the-claim-form-with-the-exchange-item-list/record-the-claim-form-with-the-exchange-item-list.component';
import { RecordTheClaimFormWithTheExchangeItemEditComponent } from './record-the-claim-form-with-the-exchange-item-edit/record-the-claim-form-with-the-exchange-item-edit.component';
import { RecordTheClaimFormWithTheExchangeItemNewComponent } from './record-the-claim-form-with-the-exchange-item-new/record-the-claim-form-with-the-exchange-item-new.component';
import { RecordTheClaimFormWithTheExchangeItemViewComponent } from './record-the-claim-form-with-the-exchange-item-view/record-the-claim-form-with-the-exchange-item-view.component';
import { RecordTheClaimFormWithTheExchangeItemRoutingModule } from './record-the-claim-form-with-the-exchange-item.routing.module';
import { RecordTheClaimFormWithTheExchangeItemService } from './shared/record-the-claim-form-with-the-exchange-item.service';
import { RecordTheClaimFormWithTheExchangeItemGuard } from './shared/record-the-claim-form-with-the-exchange-item.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordTheClaimFormWithTheExchangeItemListComponent,
    RecordTheClaimFormWithTheExchangeItemNewComponent,
    RecordTheClaimFormWithTheExchangeItemEditComponent,
    RecordTheClaimFormWithTheExchangeItemViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordTheClaimFormWithTheExchangeItemRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordTheClaimFormWithTheExchangeItemService,
    RecordTheClaimFormWithTheExchangeItemGuard
  ],
  entryComponents: [
    RecordTheClaimFormWithTheExchangeItemNewComponent,
    RecordTheClaimFormWithTheExchangeItemEditComponent,
    RecordTheClaimFormWithTheExchangeItemViewComponent
  ]
})

export class RecordTheClaimFormWithTheExchangeItemModule {
}
