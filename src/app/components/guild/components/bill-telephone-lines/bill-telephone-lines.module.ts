import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BillTelephoneLinesListComponent } from './bill-telephone-lines-list/bill-telephone-lines-list.component';
import { BillTelephoneLinesEditComponent } from './bill-telephone-lines-edit/bill-telephone-lines-edit.component';
import { BillTelephoneLinesNewComponent } from './bill-telephone-lines-new/bill-telephone-lines-new.component';
import { BillTelephoneLinesViewComponent } from './bill-telephone-lines-view/bill-telephone-lines-view.component';
import { BillTelephoneLinesRoutingModule } from './bill-telephone-lines.routing.module';
import { BillTelephoneLinesService } from './shared/bill-telephone-lines.service';
import { BillTelephoneLinesGuard } from './shared/bill-telephone-lines.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BillTelephoneLinesListComponent,
    BillTelephoneLinesNewComponent,
    BillTelephoneLinesEditComponent,
    BillTelephoneLinesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BillTelephoneLinesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BillTelephoneLinesService,
    BillTelephoneLinesGuard
  ],
  entryComponents: [
    BillTelephoneLinesNewComponent,
    BillTelephoneLinesEditComponent,
    BillTelephoneLinesViewComponent
  ]
})

export class BillTelephoneLinesModule {
}
