import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordTheValueOfTelephoneBillListComponent } from './record-the-value-of-telephone-bill-list/record-the-value-of-telephone-bill-list.component';
import { RecordTheValueOfTelephoneBillEditComponent } from './record-the-value-of-telephone-bill-edit/record-the-value-of-telephone-bill-edit.component';
import { RecordTheValueOfTelephoneBillNewComponent } from './record-the-value-of-telephone-bill-new/record-the-value-of-telephone-bill-new.component';
import { RecordTheValueOfTelephoneBillViewComponent } from './record-the-value-of-telephone-bill-view/record-the-value-of-telephone-bill-view.component';
import { RecordTheValueOfTelephoneBillRoutingModule } from './record-the-value-of-telephone-bill.routing.module';
import { RecordTheValueOfTelephoneBillService } from './shared/record-the-value-of-telephone-bill.service';
import { RecordTheValueOfTelephoneBillGuard } from './shared/record-the-value-of-telephone-bill.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordTheValueOfTelephoneBillListComponent,
    RecordTheValueOfTelephoneBillNewComponent,
    RecordTheValueOfTelephoneBillEditComponent,
    RecordTheValueOfTelephoneBillViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordTheValueOfTelephoneBillRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordTheValueOfTelephoneBillService,
    RecordTheValueOfTelephoneBillGuard
  ],
  entryComponents: [
    RecordTheValueOfTelephoneBillNewComponent,
    RecordTheValueOfTelephoneBillEditComponent,
    RecordTheValueOfTelephoneBillViewComponent
  ]
})

export class RecordTheValueOfTelephoneBillModule {
}
