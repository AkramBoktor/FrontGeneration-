import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SupplementaryRecordListComponent } from './supplementary-record-list/supplementary-record-list.component';
import { SupplementaryRecordEditComponent } from './supplementary-record-edit/supplementary-record-edit.component';
import { SupplementaryRecordNewComponent } from './supplementary-record-new/supplementary-record-new.component';
import { SupplementaryRecordViewComponent } from './supplementary-record-view/supplementary-record-view.component';
import { SupplementaryRecordRoutingModule } from './supplementary-record.routing.module';
import { SupplementaryRecordService } from './shared/supplementary-record.service';
import { SupplementaryRecordGuard } from './shared/supplementary-record.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SupplementaryRecordListComponent,
    SupplementaryRecordNewComponent,
    SupplementaryRecordEditComponent,
    SupplementaryRecordViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SupplementaryRecordRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SupplementaryRecordService,
    SupplementaryRecordGuard
  ],
  entryComponents: [
    SupplementaryRecordNewComponent,
    SupplementaryRecordEditComponent,
    SupplementaryRecordViewComponent
  ]
})

export class SupplementaryRecordModule {
}
